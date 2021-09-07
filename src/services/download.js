import { store } from '../redux/store';

const { dialog } = window.require('@electron/remote');
const ytdl = window.require('ytdl-core');
const ffmpeg = window.require('fluent-ffmpeg');
const ffmpegStatic = window.require('ffmpeg-static');
const imgdl = window.require('image-downloader');
const NodeID3 = window.require('node-id3');
const fs = window.require('fs');
const path = window.require('path');

const ffmpegPath = ffmpegStatic.replace('app.asar', 'app.asar.unpacked');
ffmpeg.setFfmpegPath(ffmpegPath);

class Download {

  constructor(manager) {
    this.manager = manager;
    this.folder = store.getState()?.folder;
  };

  getPercentage = (dld, total) => parseInt(100 / total * dld);

  validFilename = name => name.replace(/\\|\/|:|\*|\?|"|<|>|\|:/g, '');

  async cover(url, name) {
    let dest = path.join(this.folder, 'Covers', `${name}.jpg`),
    { filename } = await imgdl.image({ url, dest });
    return filename;
  };

  converter(folder, song, title) {
    return new Promise((res, rej) => {
      let tagged = path.join(folder, `${title}.mp3`);      
      ffmpeg(song, { timeout: 30 }).output(tagged)
        .on('error', err => rej(err))
        .on('end', () => {
          fs.unlink(song, async err => {
            if (err) throw err;
            await NodeID3.Promise.write(this.tags, tagged);
            res();
          });
        }).run();
    });
  };

  downloader(url, title) {
    return new Promise((res, rej) => {
      let song = path.join(this.folder, `${title} (untagged).mp3`);
      ytdl(url, { quality: 'highestaudio', filters: 'audioonly' })
        .on('progress', (_, num1, num2) => {
          let progress = this.getPercentage(num1, num2);
          this.manager({ progress });
        })
        .on('error', rej)
        .on('finish', async () => {
          this.manager({ tosetup: true });
          await this.converter(this.folder, song, title);
          res();
        }).pipe(fs.createWriteStream(song));
    });
  };

  async get_song(data, _title) {
    let title = this.validFilename(_title),
    { url, album, cover, localcover } = data,
    valid = ytdl.validateURL(url);
    if (valid) {
      let tags = { ...data },
      albumName = this.validFilename(album);
      if (!localcover) {
        cover = await this.cover(cover, albumName);
      };
      tags.APIC = cover;
      this.tags = tags;
      await this.downloader(url, title);
    } else {
      dialog.showErrorBox('Invalid Youtube URL',
        `The URL for ${data.title} from ${data.artist} is invalid.`);
    };
    return valid;
  };

};

export { Download };