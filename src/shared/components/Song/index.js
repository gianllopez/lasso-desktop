import React from 'react';
import defaultCover from '../../../assets/default-cover.jpg'
import './index.scss';

export function Song({ data = {}, ...rest }) {

  let { title, artist, album, cover } = data;

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
        <i className="uil uil-arrow-to-bottom download"/>
        <i className="uil uil-trash-alt delete"/>
        <i className="uil uil-edit-alt edit"/>
      </div>
    </div>
  );

};
