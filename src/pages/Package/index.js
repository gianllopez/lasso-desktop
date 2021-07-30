import React, { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Song } from '../../shared/components/Song';
import { Button } from '../../shared/components/Button';
import { Message } from '../../shared/components/Message';
import './index.scss';
import { CLEAR_PACKAGE, SET_PACKAGE } from '../../redux/actions';
import { Editor } from './Editor';

export function Package() {

  const store = useStore();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [editingSong, setEditingSong] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    let storeState = store.getState(),
    { loaded, content } = storeState[0] || {};
    setData(content); setLoaded(loaded);
  }, [store]);

  const onClear = () => {
    dispatch(CLEAR_PACKAGE);
    setCleared(true);
    setTimeout(() => setCleared(false), 700);
  };

  const editHandler = song => {
    console.log(song)
  };

  const downloadHandler = song => {
    console.log('Downloading: ', song);
  };

  const deleteHandler = index => {
    console.log(index)
  };

  return (
    <div className="package-page">
      <div className="presentation">
        <h2>Loaded package</h2>
        <p>The current loaded package contains the following songs</p>
      </div>
      <div className="btns st-w">
        <Button
          className="dl-all"
          label="Download all"
          unicon="uil uil-arrow-to-bottom"
          disabled={!loaded}
        />
        <Button
          onClick={onClear}
          className="clear-all"
          label="Clear package"
          unicon="uil uil-trash-alt"
          disabled={!loaded}
        />
      </div>
      <div className="songs-container st-w">
        { loaded ? 
          data?.map((song, i) => (
            <Song data={song} key={i}
              onDownload={() => downloadHandler(song)}
              onDelete={() => deleteHandler(i)}
              onEdit={() => setEditingSong(song)}
            /> )) :
          <p className="missing c-gray">
            You haven't load your package
          </p> }
      </div>
      <Message
        display={cleared}
        text="Package was cleared"
        unicon="uil uil-check-circle"
      />
      <Editor data={editingSong}
        toClose={() => setEditingSong(null)}
        onSave={editHandler}
      />
    </div>
  );
};