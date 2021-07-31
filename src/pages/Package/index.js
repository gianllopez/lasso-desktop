import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import cls from 'classnames';
import { SET_PACKAGE } from '../../redux/actions';
import { useStoreState } from '../../shared/hooks/useStoreState';
import { Button, Message, Song } from '../../shared/components';
import { equalObjects } from '../../shared/utils';
import { Editor } from './Editor';
import './index.scss';

const fs = window.require('fs');

function Package() {

  const store = useStoreState();
  const dispatch = useDispatch();

  const [data, setData] = useState(store.content);
  const [editingSong, setEditingSong] = useState(null);
  
  const [message, setMessage] = useState({ show: false, text: '' });
  const [loaded, setLoaded] = useState(store.loaded);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    if (data.length === 0) { setLoaded(false) };
    let mod = !equalObjects(store.content, data);
    setModified(mod);
  }, [store.content, data]);

  useEffect(() => {
    let { text, show } = message;
    if (show) {
      let msg = { text, show: false };
      setTimeout(() => setMessage(msg), 700);
    };
  }, [message]);

  const onClear = () => {
    setData([]);
    setMessage({ text: 'Package was cleared', show: true });
  };

  const editHandler = ({ i: index, ...rest }) => {
    let newData = [ ...data ];
    newData[index] = rest;
    let { i, ...song } = editingSong,   
    hasChanges = !equalObjects(rest, song);
    if (hasChanges) {
      setData(newData);
      setMessage({ text: 'Succesfully edition!', show: true });
    };
    setEditingSong(null);
  };  

  const deleteHandler = index => {
    let updatedData = [ ...data ];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const savePackage = () => {
    dispatch(SET_PACKAGE(data || []));
    let parsedData = JSON.stringify(data);
    fs.writeFile(store.path, parsedData, () => {});
    setMessage({ text: 'Package was saved', show: true });
  };

  return (
    <div className="package-page">
      <div className="presentation">
        <h2>Loaded package</h2>
        <p>The current loaded package contains the following songs</p>
      </div>
      <div className="btns st-w">
        <Button
          onClick={modified ? savePackage : () => {}}
          disabled={modified ? false : !loaded}
          label={modified ? 'Save package' : 'Send to queue'}
          className={cls('queue-all', { 'save-all': modified })}
          unicon={ modified ? 'uil uil-save' : 'uil uil-arrow-to-bottom'}
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
                onDelete={() => deleteHandler(i)}
                onEdit={() => setEditingSong({ ...song, i })}
              /> )) :
            <p className="missing c-gray">
              You haven't load your package
            </p> }
      </div>
      <Message
        display={message.show}
        text={message.text}
        unicon="uil uil-check-circle"
      />
      <Editor data={editingSong}
        onSave={editHandler}
        toClose={() => setEditingSong(null)}
      />
    </div>
  );
};

const mapStateToProps = ({ loaded, content }) => ({ loaded, content });

export default connect(mapStateToProps)(Package);