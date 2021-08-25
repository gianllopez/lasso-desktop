import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import cls from 'classnames';
import { DOWNLOAD, SET_PACKAGE } from '../../redux/actions';
import { Button, Message, Song } from '../../shared/components';
import { compare, manageFolder } from '../../shared/utils';
import { ToFolder } from './ToFolder';
import { Editor } from './Editor';
import './index.scss';

const fs = window.require('fs');

function Package(props) {

  let { loaded, path, content, downloading } = props;

  const dispatch = useDispatch();

  const [data, setData] = useState(content);
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [editing, setEditing] = useState(null);
  const [change, setChange] = useState(false);
  const [redo, setRedo] = useState(false);
  const [message, setMessage] = useState({ show: false, text: '' });

  useEffect(() => {
    let diff = !compare(content, data);
    setChange(diff);
  }, [content, data]);

  useEffect(() => {
    let { text, show } = message;
    if (show) {
      let msg = { text, show: false };
      setTimeout(() => setMessage(msg), 700);
    };
  }, [message]);

  useEffect(() => {
    if (downloading && index === data.length) {
      setMessage({ text: 'Your package has been downloaded!', show: true });
      setReady(true);
      dispatch(DOWNLOAD);
    };
  }, [index]);

  const onClear = () => {
    setData([]);
    setMessage({ text: 'Package was modified', show: true });
    setRedo(true);
  };
  
  const onRedo = () => {
    setData(content);
    setMessage({ text: 'Package was restored', show: true });
    setRedo(false);
  };

  const editHandler = ({ i: index, ...rest }) => {
    let newData = [ ...data ];
    newData[index] = rest;
    let { i, ...song } = editing,   
    hasChanges = !compare(rest, song);
    if (hasChanges) {
      setData(newData);
      setRedo(true);
      setMessage({ text: 'Succesfully edition!', show: true });
    };
    setEditing(null);
  };  

  const deleteHandler = index => {
    let updatedData = [ ...data ];
    updatedData.splice(index, 1);
    setData(updatedData);
    setRedo(true);
  };

  const savePackage = () => {
    dispatch(SET_PACKAGE({ content: data }));
    let parsedData = JSON.stringify(data);
    fs.writeFile(path, parsedData, () => {});
    setMessage({ text: 'Package was saved', show: true });
    setRedo(false);
  };

  const toggleDownload = () => {
    setReady(false);
    manageFolder();
    dispatch(DOWNLOAD);
  };

  const nextSong = () => {
    let newIndex = index < content.length ? index + 1 : 0;
    setIndex(newIndex);
  };

  return (
    <div className="package-page">
      <div className="header-text">
        <h2>Loaded package</h2>
        <p>The current loaded package contains the following songs</p>
      </div>
      <div className="btns">
        <Button
          disabled={change ? false : !data.length}
          className={cls('dl-all', { 'save-all': change })}
          label={change ? 'Save package' : downloading ? 'Pause download' : 'Download package'}
          onClick={change ? savePackage : toggleDownload}
          unicon={change ? 'uil uil-save' : 'uil uil-arrow-to-bottom'}
        />
        <Button
          disabled={redo ? false : !data.length}
          className={redo ? 'redo' : 'clear-all'}
          label={redo ? 'Redo package' : 'Clear package'}
          onClick={redo ? onRedo : onClear}
          unicon={redo ? 'uil uil-redo' : 'uil uil-trash-alt'}
        />
      </div>
      <div className="songs-container">
        { loaded && data.length ? 
            data.map((song, i) => (
              <Song
                allReady={ready}
                turn={index === i}
                data={song} key={i}
                onComplete={nextSong}
                downloading={downloading}
                onDelete={() => deleteHandler(i)}
                onEdit={() => setEditing({ ...song, i })}
              /> )) :
            <p className="missing c-gray">
              { loaded ?
                  !data.length && 'The uploaded package is empty' :
                  'You haven\'t uploaded any package' }
            </p> }
      </div>      
      <ToFolder/>
      <Message
        display={message.show}
        text={message.text}
        unicon="uil uil-check-circle"
      />
      <Editor
        data={editing}
        onSave={editHandler}
        toClose={() => setEditing(null)}
      />
    </div>
  );
};

const mapStateToProps = store => store;

export default connect(mapStateToProps)(Package);