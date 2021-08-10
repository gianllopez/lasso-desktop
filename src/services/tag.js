const ffmpeg = window.require('ffmpeg-static');
const tagger = window.require('ffmetadata');

class TagService {

  constructor() { tagger.setFfmpegPath(ffmpeg) };

  execute(path, tags) {
    tagger.write(path, tags, err => {
      if (err) return;
      debugger
    });
  };

};

const Tag = new TagService();
export { Tag };