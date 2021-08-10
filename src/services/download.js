import { store } from '../redux/store';
const ytdl = window.require('ytdl-core'),
fs = window.require('fs'),
path = window.require('path');

class Download {

  constructor(stateManager) {
    this.stateManager = stateManager;
  };

  getProgress = (dld, total) => parseInt(100 / total * dld);

  streamHandler(url, songpath) {
    return new Promise((res, rej) => {
      ytdl(url, { quality: 'highestaudio', filters: 'audioonly' })
        .on('progress', (_, num1, num2) => {
          let progress = this.getProgress(num1, num2);
          this.stateManager({ progress });
        }).on('finish', res)
        .pipe(fs.createWriteStream(songpath));
    });
  };

  async get_mp3(url = '', title) {
    let { folder = '' } = store.getState()?.package,
    songPath = path.join(folder, `${title}.mp3`),
    valid = ytdl.validateURL(url);
    valid && await this.streamHandler(url, songPath);
    return songPath;
  };

};

export { Download };