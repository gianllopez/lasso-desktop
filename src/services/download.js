import { store } from '../redux/store';
const ytdl = window.require('ytdl-core');
const fs = window.require('fs');
const path = window.require('path');

class DownloadService {
  
  async get_mp3(url, title) {
    let { folder = '' } = store.getState()?.package,
    songPath = path.join(folder, `${title}.mp3`);
    await ytdl(url, { quality: 'highestaudio', filter: 'audioonly' })
      .pipe(fs.createWriteStream(songPath));
  };

};

export { DownloadService };