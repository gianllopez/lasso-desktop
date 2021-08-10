
const ffmpeg = window.require('ffmpeg-static');
const tagger = window.require('ffmetadata');

class TagService {

  constructor() { tagger.setFfmpegPath(ffmpeg) };

  execute(path, tags) {
    console.log(path, tags);
  };

};

const Tag = new TagService();
export { Tag };