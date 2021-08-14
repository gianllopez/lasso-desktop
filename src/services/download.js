import { store } from '../redux/store';

const ytdl = window.require('ytdl-core');
const ffmpeg = window.require('fluent-ffmpeg');
const ffmpegPath = window.require('ffmpeg-static');
const imgdl = window.require('image-downloader');
const NodeID3 = window.require('node-id3');
const fs = window.require('fs');
const path = window.require('path');

class Download {

  constructor(manager) {
    ffmpeg.setFfmpegPath(ffmpegPath);
    this.manager = manager;
  };

  getPercentage = (dld, total) => parseInt(100 / total * dld);

  validFilename = name => name.replace(/\\|\/|:|\*|\?|"|<|>|\|:/g, '');

  async cover(url, dest) {
    let { filename } = await imgdl.image({ url, dest });
    return filename;
  };

  converter(folder, song, title) {
    return new Promise((res, rej) => {
      let tagged = path.join(folder, `${title}.mp3`);      
      ffmpeg(song).output(tagged)
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

  downloader(url, outfolder, title) {
    return new Promise((res, rej) => {
      let song = path.join(outfolder, `${title} - Untaggeable.mp3`);
      ytdl(url, { quality: 'highestaudio', filters: 'audioonly' })
        .on('progress', (_, num1, num2) => {
          let progress = this.getPercentage(num1, num2);
          this.manager({ progress });
        })
        .on('finish', async () => {
          this.manager({ tosetup: true });
          await this.converter(outfolder, song, title);
          res();
        }).pipe(fs.createWriteStream(song));
    });
  };

  async get_song(data, title) {
    let { folder = '' } = store.getState()?.package,
    _title = this.validFilename(title),
    { url, album, cover } = data,
    valid = ytdl.validateURL(url);
    if (valid) {
      let tags = { ...data },
      albumName = this.validFilename(album),
      coverpath = path.join(folder, 'Covers', `${albumName}.jpg`);
      tags.APIC = await this.cover(cover, coverpath);
      this.tags = tags;
      await this.downloader(url, folder, _title);
    };
  };

};

export { Download };