/* eslint-disable no-restricted-globals */

self.onmessage = function(e) {
  let { queue } = e.data;
  if (queue) {
    
  };
};

// async function fetchSong() {
//   let dlservice = new Download(handler),
//   mp3title = `${title} - ${artist}`;
//   await dlservice.get_song(data, mp3title);
//   onComplete();
//   setDownloaded(true);
// };
// fetchSong();