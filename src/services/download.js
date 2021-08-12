import { store } from '../redux/store';
const ytdl = window.require('ytdl-core');
const ffmpeg = window.require('fluent-ffmpeg');
const ffmpegPath = window.require('ffmpeg-static');
const fs = window.require('fs');
const path = window.require('path');

class Download {

  constructor(manager) {
    ffmpeg.setFfmpegPath(ffmpegPath);
    this.manager = manager;
  };

  getPercentage = (dld, total) => parseInt(100 / total * dld);

  converter(folder, song, title) {
    return new Promise((res, rej) => {
      let tagged = path.join(folder, `${title}.mp3`);      
      ffmpeg(song).output(tagged)
        .on('error', err => rej(err))
        .on('end', () => fs.unlink(song, err => err ? rej(err) : res()))
        .run();
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
          await this.converter(outfolder, song, title);
          res();
        }).pipe(fs.createWriteStream(song));
    });
  };

  async get_mp3(url = '', title) {
    let { folder = '' } = store.getState()?.package,
    _title = title.replace(/\\|\/|:|\*|\?|"|<|>|\|:/g, ''),
    valid = ytdl.validateURL(url)
    if (valid) {
      await this.downloader(url, folder, _title);
      return path.join(folder, `${title}.mp3`);
    };
  };

};

export { Download };