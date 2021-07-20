import React, { Fragment } from 'react';
import './index.scss';

export function Queue() {
  return (
    <Fragment>
      <div class="presentation">
        <h2>Current downloads</h2>
        <p>That’s your listed queue</p>
      </div>
      <div class="current-queue">
        <div class="buttons-group">
          <button class="cancel-all">
            Cancel all
            <i class="uil uil-times-circle"></i>
          </button>
          <button class="pause-all">
            Pause all
            <i class="uil uil-pause-circle"></i>
          </button>
        </div>
        <div class="songs-container">
          <p class="empty-msg">You are not downloading any song</p>
        </div>
      </div>
    </Fragment>
  )
};
