import React, { Fragment, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { CLEAR_QUEUE, PAUSE_QUEUE } from '../../redux/actions';
import { Button, Song } from '../../shared/components';
import { createFolder, folderExists } from '../../shared/utils';
import './index.scss';

const { remote: electron } = window.require('electron');
const path = window.require('path');

function Queue({ downloading, queue }) {

  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const toggleDownload = () => {
    if (downloading) setIndex(0);
    dispatch(PAUSE_QUEUE);
  };

  const removeAll = () => {
    dispatch(CLEAR_QUEUE);
    setIndex(0);
  };

  const openFolder = () => {
    let { app, shell } = electron,
    docs = app.getPath('documents'),
    folder = path.join(docs, 'Lasso Downloads'),
    exists = folderExists(folder);
    if (exists) shell.openPath(folder)
    else {
      createFolder(folder);
      openFolder();
    };
  };

  useEffect(() => {
    if (index === queue.length) {
      dispatch(PAUSE_QUEUE);
      setIndex(0);
    };
  }, [index]);

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
            onClick={removeAll}
            className="remove-all"
            unicon="uil uil-times-circle"
            disabled={queue.length === 0 || downloading}
            />
          <Button
            className="dlpause-all"
            onClick={toggleDownload}
            disabled={queue.length === 0}
            label={downloading ? 'Pause all' : 'Download all'}
            unicon={downloading ? 'uil uil-pause-circle' : 'uil uil-play-circle'}
          />
        </div>
        <div className="songs-container">
          { queue?.length > 0 ?
              queue.map((song, i) =>
                <Song
                  queued="true"
                  data={song} key={i}
                  downloading={downloading}
                  turn={downloading && index === i}
                  onComplete={() => setIndex(index + 1)}
                /> ) :
              <p className="missing c-gray" style={{ maxWidth: 'initial' }}>
                You are not downloading any song
              </p> }
        </div>
      </div>
      <i className="uil uil-folder-open goto-folder"
        title="Open downloads folder"
        onClick={openFolder}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ queue }) => queue;

export default connect(mapStateToProps)(Queue);
