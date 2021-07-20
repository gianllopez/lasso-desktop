import React, { Fragment } from 'react';
import './index.scss';

export function Queue() {
  return (
    <Fragment>
      <div className="presentation">
        <h2>Current downloads</h2>
        <p>That’s your listed queue</p>
      </div>
      <div className="current-queue">
        <div className="buttons-group">
          <button className="cancel-all">
            Cancel all
            <i className="uil uil-times-circle"></i>
          </button>
          <button className="pause-all">
            Pause all
            <i className="uil uil-pause-circle"></i>
          </button>
        </div>
        <div className="songs-container">
          <p className="empty-msg">You are not downloading any song</p>
        </div>
      </div>
    </Fragment>
  )
};
