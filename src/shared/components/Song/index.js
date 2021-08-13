import React, { useEffect, useState } from 'react';
import { Download } from '../../../services/download';
import { CircularProgressbar } from 'react-circular-progressbar';
import defaultCover from '../../../assets/default-cover.jpg'
import 'react-circular-progressbar/dist/styles.css';
import './index.scss';
import { Fragment } from 'react';

export function Song(props) {

  let { data, onDelete, onEdit } = props,
  { title, artist, album, cover } = data;

  // queued needed props:
  let { queued, downloading, turn, onComplete } = props;

  const [progress, setProgress] = useState({});
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (turn) {
      async function fetchSong() {
        let dlservice = new Download(pg => setProgress(pg)),
        mp3title = `${title} - ${artist}`;
        await dlservice.get_song(data, mp3title);
        onComplete();
        setDownloaded(true);
      };
      fetchSong();
    };
  }, [downloading, turn]);

  return (
    <div className="song">
      <figure>
        <img src={cover !== 'default' ? cover : defaultCover} alt=""/>
      </figure>
      <div className="tags">
        <p className="title">{ title }</p>
        <p className="artist">{ artist }</p>
        <p className="album">{ album }</p>
      </div>
      <div className="actions">
        { queued ?
          turn ?
            <div className="pgb">
              <CircularProgressbar
                value={progress || 0}
                strokeWidth="15"
              />
            </div> : downloaded ?
              <i className="uil uil-check-circle dlded"/> :
              <i className="uil uil-clock-eight"/> :
          <Fragment>
            <i className="uil uil-edit-alt edit" onClick={onEdit}/> 
            <i onClick={onDelete} className="uil uil-trash-alt delete"/> 
          </Fragment> }
      </div>
    </div>
  );

};
