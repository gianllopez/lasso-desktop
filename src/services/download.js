const ytdl = window.require('ytdl-core');
const fs = window.require('fs');

class DownloadService {

  async get_mp3(url, title) {
    await ytdl(url, { quality: 'highestaudio', filter: 'audioonly' })
      .pipe(fs.createWriteStream(`${title}.mp3`));
    // debugger
  };

  
};

export { DownloadService };