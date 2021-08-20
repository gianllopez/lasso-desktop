import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import cls from 'classnames';
import { CLEAR_PACKAGE, SET_PACKAGE, SET_QUEUE } from '../../redux/actions';
import { Button, Message, Song } from '../../shared/components';
import { compareObjects } from '../../shared/utils';
import { Editor } from './Editor';
import './index.scss';

const fs = window.require('fs');

function Package({ loaded, path, content }) {

  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useState(content);
  const [editingSong, setEditingSong] = useState(null);
  const [locloaded, setLocLoaded] = useState(loaded);
  const [cleared, setCleared] = useState(false);
  const [message, setMessage] = useState({ show: false, text: '' });
  const [modified, setModified] = useState(false);

  useEffect(() => {
    let mod = !compareObjects(content, data);
    setModified(mod);
  }, [content, data]);

  useEffect(() => {
    let { text, show } = message;
    if (show) {
      let msg = { text, show: false };
      setTimeout(() => setMessage(msg), 700);
    };
  }, [message]);

  const onClear = () => {
    setData([]);
    setLocLoaded(false);
    setCleared(true);
    setMessage({ text: 'Package was cleared', show: true });
  };
  
  const onRedo = () => {
    setData(content);
    setLocLoaded(true);
    setCleared(false);
    setMessage({ text: 'Package was redid', show: true });
  };

  const editHandler = ({ i: index, ...rest }) => {
    let newData = [ ...data ];
    newData[index] = rest;
    let { i, ...song } = editingSong,   
    hasChanges = !compareObjects(rest, song);
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
    fs.writeFile(path, parsedData, () => {});
    setMessage({ text: 'Package was saved', show: true });
  };

  const queuePackage = () => {
    setData([]);
    dispatch(SET_QUEUE(data));
    dispatch(CLEAR_PACKAGE);
    history.push('/queue');    
  };

  return (
    <div className="package-page">
      <div className="presentation">
        <h2>Loaded package</h2>
        <p>The current loaded package contains the following songs</p>
      </div>
      <div className="btns st-w">
        <Button
          disabled={modified ? false : !loaded}
          onClick={modified ? savePackage : queuePackage}
          label={modified ? 'Save package' : 'Send to queue'}
          className={cls('queue-all', { 'save-all': modified })}
          unicon={ modified ? 'uil uil-save' : 'uil uil-arrow-to-bottom'}
        />
        <Button
          disabled={!loaded}
          onClick={cleared ? onRedo : onClear}
          className={cleared ? 'redo-pkg' : 'clear-all'}
          label={cleared ? 'Redo package' : 'Clear package'}
          unicon={cleared ? 'uil uil-redo' : 'uil uil-trash-alt'}
        />
      </div>
      <div className="songs-container st-w">
        { locloaded ? 
            data?.map((song, i) => (
              <Song data={song} key={i}
                onDelete={() => deleteHandler(i)}
                onEdit={() => setEditingSong({ ...song, i })}
              /> )) :
            <p className="missing c-gray">
              { cleared ?
                  'The loaded package is empty' :
                  'You haven\'t loaded your package' }
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

const mapStateToProps = ({ package: pkg }) => pkg;

export default connect(mapStateToProps)(Package);