import React, { useState } from 'react';
import defaultCover from '../../../assets/default-cover.jpg'
import './index.scss';
import { QueuedActions } from './QueuedActions';

export function Song(props) {

  let { data, onDelete, onEdit, queued, index } = props,
  { title, artist, album, cover } = data;

  const [paused, setPaused] = useState(index !== 0); // change
  const [downloading, setDownloading] = useState(index === 0); // change

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
          <QueuedActions
            paused={paused}
            downloading={downloading}
            onPause={() => setPaused(!paused)}
          /> : 
          <i className="uil uil-edit-alt edit" onClick={onEdit}/> }
          <i onClick={onDelete} className="uil uil-trash-alt delete"/> 
      </div>
    </div>
  );

};
