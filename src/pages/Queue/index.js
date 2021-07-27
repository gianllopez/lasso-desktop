import React, { Fragment } from 'react';
import { Button } from '../../shared/components/Button';
import './index.scss';

export function Queue() {
  return (
    <Fragment>
      <div className="presentation">
        <h2>Current downloads</h2>
        <p>That’s your listed queue</p>
      </div>
      <div className="current-queue list">
        <div className="buttons-group">
          <Button
            label="Cancel all"
            className="cancel-all"
            unicon="uil uil-times-circle"
          />
          <Button
            label="Pause all"
            className="pause-all"
            unicon="uil uil-pause-circle"
          />
        </div>
        <div className="songs-container">
          <p className="missing c-gray" style={{ maxWidth: 'initial' }}>
            You are not downloading any song
          </p>
        </div>
      </div>
    </Fragment>
  );
}
