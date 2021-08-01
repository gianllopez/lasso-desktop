import React, { Fragment, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { PAUSE_QUEUE } from '../../redux/actions';
import { DownloadService } from '../../services/download';
import { useStoreState } from '../../shared/hooks/useStoreState';
import { Button, Song } from '../../shared/components';
import './index.scss';

function Queue() {

  const store = useStoreState('queue'),
  { downloading, queue } = store;

  const dispatch = useDispatch();
  const [fetchingIndex, setFetchingIndex] = useState(null);

  const downloadAll = async () => {
    let service = new DownloadService();
    for (let song of queue) {
      setFetchingIndex(queue.indexOf(song));
      let url = await service.get_url(song.title);
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
            onClick={ downloading ? () => dispatch(PAUSE_QUEUE) : downloadAll}
            unicon={downloading ? 'uil uil-pause-circle' : 'uil uil-play-circle'}
          />
        </div>
        <div className="songs-container">
          { queue?.length > 0 ?
              queue.map((song, i) => <Song data={song} index={i} key={i}/> ) :
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
