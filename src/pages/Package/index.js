import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Song } from '../../shared/components/Song';
import { Button } from '../../shared/components/Button';
import { Message } from '../../shared/components/Message';
import './index.scss';
import { CLEAR_PACKAGE } from '../../redux/actions';
import { Editor } from './Editor';

export function Package() {

  let store = useStore(), cnt = store.getState(),
  { loaded, content } = cnt[0] || {};

  const dispatch = useDispatch();
  const [cleared, setCleared] = useState(false);
  const [editing, setEditing] = useState(false);

  const onClear = () => {
    dispatch(CLEAR_PACKAGE);
    setCleared(true);
    setTimeout(() => setCleared(false), 700);
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
          content.map((song, i) => (
            <Song
              data={song}
              key={i}
              onEdit={() => setEditing(song)}
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
      <Editor data={editing}/>
    </div>
  );
};