import React, { Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useStoreState } from '../../shared/hooks/useStoreState';
import { Button } from '../../shared/components/Button';
import './index.scss';
import { PAUSE_QUEUE } from '../../redux/actions';

function Queue() {

  const store = useStoreState('queue'),
  { downloading, queue } = store;

  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="presentation">
        <h2>Current downloads</h2>
        <p>That’s your listed queue</p>
      </div>
      <div className="current-queue st-w">
        <div className="buttons-group">
          <Button
            label="Cancel all"
            className="cancel-all"
            unicon="uil uil-times-circle"
          />
          <Button
            className="dlpause-all"
            onClick={() => dispatch(PAUSE_QUEUE)}
            label={downloading ? 'Pause all' : 'Download all'}
            unicon={downloading ? 'uil uil-pause-circle' : 'uil uil-play-circle'}
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
};

const mapStateToProps = ({ queue }) => queue;

export default connect(mapStateToProps)(Queue);
