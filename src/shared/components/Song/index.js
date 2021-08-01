import React, { Fragment, useState } from 'react';
import defaultCover from '../../../assets/default-cover.jpg'
import './index.scss';

export function Song(props) {

  let { data, onDelete, onEdit, ...rest } = props,
  { title, artist, album, cover } = data;

  let { queued, index, pausedq } = rest;

  const [paused, setPaused] = useState(true);
  const [downloading, setDownloading] = useState(index === 0);

  return (
    <div className="song" {...rest}>
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
            ( downloading ?
              <i onClick={() => setPaused(!paused)}
                className={ paused ? 'uil uil-play' : 'uil uil-pause' }/> :
                !pausedq && <i className="uil uil-clock-eight wait"/> ) :
            <i className="uil uil-edit-alt edit" onClick={onEdit}/> }
          <i onClick={queued ? () => {} : onDelete }
            className="uil uil-trash-alt delete"/>
      </div>
    </div>
  );

};
