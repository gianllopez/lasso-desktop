import { store } from '../redux/store';
const ytdl = window.require('ytdl-core');
const ffmpeg = window.require('fluent-ffmpeg');
const ffmpegPath = window.require('ffmpeg-static');
const fs = window.require('fs');
const path = window.require('path');

class Download {

  constructor(stateManager) {
    this.stateManager = stateManager;
  };

  getProgress = (dld, total) => parseInt(100 / total * dld);

  formatTitle(title) {
    let newTitle = '',
    invalid = ['\\', '/', ':', '*', '?', '"', '<', '>', '|'];
    for (let char of title) {
      newTitle = invalid.includes(char) ? '' : char;
    };
    return newTitle;
  };

  streamHandler(url, outfolder, title) {
    return new Promise((res, rej) => {
      let safeTitle = title.replace(/\\|\/|:|\*|\?|"|<|>|\|:/g, ''),
      song = path.join(outfolder, `${safeTitle} - Untaggeable.mp3`);
      ytdl(url, { quality: 'highestaudio', filters: 'audioonly' })
        .on('progress', (_, num1, num2) => {
          let progress = this.getProgress(num1, num2);
          this.stateManager({ progress });
        }).on('finish', () => {
          let tagged = path.join(outfolder, `${safeTitle}.mp3`);
          ffmpeg.setFfmpegPath(ffmpegPath);
          ffmpeg(song).output(tagged)
            .on('end', () => {
              fs.unlink(song, (err) => {
                if (err) throw err;
                res();
              });
            })
            .on('error', err => console.error(err))
            .run();
        }).pipe(fs.createWriteStream(song));
    });
  };

  async get_mp3(url = '', title) {
    let { folder = '' } = store.getState()?.package,    
    valid = ytdl.validateURL(url);
    if (valid) {
      await this.streamHandler(url, folder, title);
      return path.join(folder, `${title}.mp3`);
    };
  };

};

export { Download };