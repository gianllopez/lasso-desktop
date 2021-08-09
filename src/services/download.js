import { store } from '../redux/store';
const ytdl = window.require('ytdl-core'),
fs = window.require('fs'),
path = window.require('path');

class DownloadService {

  getProgress(dld, total) {
    let value = parseInt(100 / total * dld);
    return `${value}%`;
  };

  writeHandler(url, songpath) {
    let state = {};
    return new Promise((res, rej) => {
      ytdl(url, { quality: 'highestaudio', filters: 'audioonly' })
        .on('progress', (_, num1, num2) => {
          let progress = this.getProgress(num1, num2);
          res(progress);
        })
        .on('finish', () => {
          state.finished = true;
          res(state);
        })
        .pipe(fs.createWriteStream(songpath))
    });
  };


  async get_mp3(url = '', title) {
    let { folder = '' } = store.getState()?.package,
    songPath = path.join(folder, `${title}.mp3`),
    valid = ytdl.validateURL(url);
    if (valid) {
      await this.writeHandler(url, songPath)
        .then(state => console.log(state));
    };
  };

};

export { DownloadService };