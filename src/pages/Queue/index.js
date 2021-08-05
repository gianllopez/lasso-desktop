import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Song } from '../../shared/components';
import './index.scss';

function Queue({ downloading, queue }) {

  return (
    <Fragment>
      <div className="presentation">
        <h2>Current downloads</h2>
        <p>That’s your listed queue</p>
      </div>
      <div className="current-queue st-w">
        <div className="buttons-group">
          <Button
            label="Remove all"
            className="remove-all"
            unicon="uil uil-times-circle"
          />
          <Button
            className="dlpause-all"
            label={downloading ? 'Pause all' : 'Download all'}
            unicon={downloading ? 'uil uil-pause-circle' : 'uil uil-play-circle'}
          />
        </div>
        <div className="songs-container">
          { queue?.length > 0 ?
              queue.map((song, i) =>
                <Song
                  data={song}
                  queued="true"
                  index={i} key={i}
                  globalDownloading={downloading}
                /> ) :
              <p className="missing c-gray" style={{ maxWidth: 'initial' }}>
                You are not downloading any song
              </p> }
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ queue }) => queue;

export default connect(mapStateToProps)(Queue);
