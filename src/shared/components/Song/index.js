import React, { useEffect, useState, Fragment } from 'react';
import { Download } from '../../../services/download';
import { CircularProgressbar } from 'react-circular-progressbar';
import cls from 'classnames';
import defaultCover from '../../../assets/default-cover.jpg'
import 'react-circular-progressbar/dist/styles.css';
import './index.scss';
import { worker } from '../../../';

export function Song(props) {

  let { data, onDelete, onEdit } = props,
  { title, artist, album, cover } = data;

  // queued needed props:
  let { queued, downloading, turn, onComplete } = props;

  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handler = newState => {
    let { progress, tosetup } = newState;
    if (progress) setProgress(progress);
    if (tosetup) {
      setLoading(true);
      setProgress(50);
    };
  };

  useEffect(() => {
    if (turn) {      
      worker.postMessage({ data });
      worker.onmessage = e => {
        let { completed } = e.data;
        if (completed) {
          // worker.terminate();
          onComplete();
        };
      };      
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
      { downloading && 
        <div className="actions">
          { queued ?
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
        </div> }
    </div>
  );

};
