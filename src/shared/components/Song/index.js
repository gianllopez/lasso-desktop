import React, { useEffect, useState, Fragment } from 'react';
import cls from 'classnames';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Download } from '../../../services/download';
import { getLocalURL, notFoundCover } from '../../utils';
import noCover from '../../../assets/no-cover.jpg'
import 'react-circular-progressbar/dist/styles.css';
import './index.scss';

export function Song(props) {

  let { data, onDelete, onEdit } = props,
  { title, artist, album, cover } = data;

  // on downloading props:
  let { downloading, _downloaded, allReady, turn, onComplete } = props;

  const [coverPrev, setCoverPrev] = useState(null);
  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  const handler = newState => {
    let { progress, tosetup } = newState;
    if (progress) setProgress(progress);
    if (tosetup) {
      setLoading(true);
      setProgress(50);
    };
  };

  useEffect(() => {
    let prev = data.localcover ? getLocalURL(cover) : cover;
    setCoverPrev(prev);
  }, [data]);

  useEffect(() => {
    if (turn) {
      async function fetchSong() {
        let dlservice = new Download(handler),
        mp3title = `${title} - ${artist}`,
        done = await dlservice.get_song(data, mp3title);
        if (done) setDownloaded(true);
        else setError(true);
        onComplete();
      };      
      fetchSong();
    };
    if (_downloaded) setDownloaded(true);
  }, [downloading, turn]);

  return (
    <div className="song">
      <figure>
        <img src={coverPrev || noCover} onError={notFoundCover} alt=""/>
      </figure>
      <div className="tags">
        <p className="title">{ title || 'Unknow' }</p>
        <p className="artist">{ artist || 'Unknow' }</p>
        <p className="album">{ album || 'Unknow' }</p>
      </div>
      <div className="actions">
      { downloading || allReady ?
          turn ? error ?
            <i className="uil uil-exclamation-triangle error"/> :
            <div className={cls('progress-bar', { 'spin': loading })}>
              <CircularProgressbar
                strokeWidth="15"
                value={progress}
              />
            </div> :
            downloaded ?
              <i className="uil uil-check-circle dlded"/> :
              error ?
                <i className="uil uil-exclamation-triangle error"/> :
                <i className="uil uil-clock-eight"/> :
          <Fragment>
            <i className="uil uil-edit-alt edit" onClick={onEdit}/> 
            <i onClick={onDelete} className="uil uil-trash-alt delete"/> 
          </Fragment> }
      </div> 
    </div>
  );

};
