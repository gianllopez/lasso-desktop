import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Download } from '../../../services/download';
import noCover from '../../../assets/no-cover.jpg'
import 'react-circular-progressbar/dist/styles.css';
import './index.scss';
import { Fragment } from 'react';

export function Song(props) {

  let { data, onDelete, onEdit } = props,
  { title, artist, album, cover } = data;

  let { downloading, turn, onComplete } = props;

  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handler = newState => {
    let { progress, tosetup } = newState;
    if (progress) setProgress(progress);
    if (tosetup) {
      setLoading(true);
      setProgress(50);
    };
  };

  useEffect(() => {
    if (downloading && turn) {      
      async function fetchSong() {
        let dlservice = new Download(handler),
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
        <img src={cover !== 'default' ? cover : noCover} alt=""/>
      </figure>
      <div className="tags">
        <p className="title">{ title }</p>
        <p className="artist">{ artist }</p>
        <p className="album">{ album }</p>
      </div>
      <div className="actions">
      { downloading ?
            turn ?
              <div className={cls('progress-bar', { 'loading': loading })}>
                <CircularProgressbar
                  strokeWidth="15"
                  value={progress}
                />
              </div> :
              downloaded ?
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
