import React, { Fragment } from 'react';
import { useStore } from 'react-redux';
import { Song } from '../../shared/components/Song';
import './index.scss';

export function Package() {

  let store = useStore(), cnt = store.getState(),
  { loaded, content } = cnt[0] || {};

  return (
    <Fragment>
      <div className="presentation">
        <h2>Loaded package</h2>
        <p>The current loaded package contains the following songs</p>
      </div>
      <div className="songs-container list">
        { loaded ? 
          content.map((song, i) => (
            <Song data={song} key={i}/> )) :
          <p className="missing c-gray">
            You haven't load your package
          </p> }
      </div>
    </Fragment>
  );
};