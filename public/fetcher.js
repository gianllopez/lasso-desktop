/* eslint-disable no-restricted-globals */

self.onmessage = function({ data }) {
  console.log(data);
  setTimeout(() => {
    self.postMessage({ completed: true });
  }, 1000);
};


// async function fetchSong() {
//   let dlservice = new Download(handler),
//   mp3title = `${title} - ${artist}`;
//   await dlservice.get_song(data, mp3title);
//   onComplete();
//   setDownloaded(true);
// };
// fetchSong();