import React, { Fragment } from 'react';
import './index.scss';

export function Package() {
  return (
    <Fragment>
      <div className="presentation">
        <h2>Loaded package</h2>
        <p>The current loaded package contains the following songs</p>
      </div>
      <div className="songs-container">
        <p className="empty-msg">The loaded package has no songs</p>
      </div>
    </Fragment>
  );
};