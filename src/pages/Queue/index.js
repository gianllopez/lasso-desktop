import React, { Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import { PAUSE_QUEUE } from '../../redux/actions';
import { Button, Song } from '../../shared/components';
import { DownloadService } from '../../services/download';
import './index.scss';

function Queue({ downloading, queue }) {

  const dispatch = useDispatch();

  const downloadAll = async () => {
    dispatch(PAUSE_QUEUE);
    if (!downloading) {
      let service = new DownloadService();
      for (let song of queue) {
        let { title, artist, url } = song,
        mp3Title = `${title} - ${artist}`;
        let mp3 = await service.get_mp3(url, mp3Title);
      };
    };
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
            onClick={downloadAll}
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
