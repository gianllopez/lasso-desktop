import React, { Fragment, useState } from 'react';
import defaultCover from '../../../assets/default-cover.jpg'
import './index.scss';

export function Song(props) {

  let { data, queued, onDelete, onEdit, ...rest } = props,
  { title, artist, album, cover } = data;

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
        { queued ? (
          <Fragment></Fragment>
        ) :
        <Fragment>
          <i className="uil uil-trash-alt delete" onClick={onDelete}/>
          <i className="uil uil-edit-alt edit" onClick={onEdit}/>
        </Fragment> }
      </div>
    </div>
  );

};
