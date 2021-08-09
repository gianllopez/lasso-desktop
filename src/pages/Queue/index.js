import React, { Fragment, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { PAUSE_QUEUE } from '../../redux/actions';
import { Button, Song } from '../../shared/components';
import './index.scss';

function Queue({ downloading, queue }) {

  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const toggleDownload = () => {
    if (downloading) setIndex(0);
    dispatch(PAUSE_QUEUE);
  };

  const onNextSong = () => {
    setIndex(index < queue.length ? index + 1 : 0);
  };

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
            onClick={toggleDownload}
            unicon={downloading ? 'uil uil-pause-circle' : 'uil uil-play-circle'}
          />
        </div>
        <div className="songs-container">
          { queue?.length > 0 ?
              queue.map((song, i) =>
                <Song
                  queued="true"
                  data={song} key={i}
                  onComplete={onNextSong}
                  downloading={downloading}
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
