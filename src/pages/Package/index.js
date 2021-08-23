import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import cls from 'classnames';
import { DOWNLOAD, SET_PACKAGE } from '../../redux/actions';
import { Button, Message, Song } from '../../shared/components';
import { compare, manageFolder } from '../../shared/utils';
import { Editor } from './Editor';
import './index.scss';

const fs = window.require('fs');
const { remote: electron } = window.require('electron');

function Package(props) {

  let { loaded, path, content, downloading } = props;

  const dispatch = useDispatch();

  const [data, setData] = useState(content);
  const [index, setIndex] = useState(0);
  const [editingSong, setEditingSong] = useState(null);
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
    if (index === data.length && downloading) {
      dispatch(DOWNLOAD);
    };
  }, [index]);

  const openFolder = () => {
    let dlfolder = manageFolder();
    electron.shell.openPath(dlfolder);
  };

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
    let { i, ...song } = editingSong,   
    hasChanges = !compare(rest, song);
    if (hasChanges) {
      setData(newData);
      setMessage({ text: 'Succesfully edition!', show: true });
    };
    setEditingSong(null);
    setRedo(true);
  };  

  const deleteHandler = index => {
    let updatedData = [ ...data ];
    updatedData.splice(index, 1);
    setData(updatedData);
    setRedo(true);
  };

  const savePackage = () => {
    dispatch(SET_PACKAGE(data || []));
    let parsedData = JSON.stringify(data);
    fs.writeFile(path, parsedData, () => {});
    setMessage({ text: 'Package was saved', show: true });
    setRedo(false);
  };

  const toggleDownload = () => {
    manageFolder();
    dispatch(DOWNLOAD);
  };

  const onNextSong = () => {
    setIndex(index < content.length ? index + 1 : 0);
  };

  return (
    <div className="package-page">
      <div className="presentation">
        <h2>Loaded package</h2>
        <p>The current loaded package contains the following songs</p>
      </div>
      <div className="btns st-w">
        <Button
          disabled={change ? false : !data.length}
          onClick={change ? savePackage : toggleDownload}
          label={change ? 'Save package' : downloading ? 'Pause download' : 'Download package'}
          className={cls('dl-all', { 'save-all': change })}
          unicon={change ? 'uil uil-save' : 'uil uil-arrow-to-bottom'}
        />
        <Button
          onClick={redo ? onRedo : onClear}
          disabled={redo ? false : !data.length}
          className={redo ? 'redo-pkg' : 'clear-all'}
          label={redo ? 'Redo package' : 'Clear package'}
          unicon={redo ? 'uil uil-redo' : 'uil uil-trash-alt'}
        />
      </div>
      <div className="songs-container st-w">
        { loaded && data.length > 0 ? 
            data.map((song, i) => (
              <Song
                turn={index === i}
                data={song} key={i}
                onComplete={onNextSong}
                downloading={downloading}
                onDelete={() => deleteHandler(i)}
                onEdit={() => setEditingSong({ ...song, i })}
              /> )) :
            <p className="missing c-gray">
              { loaded ?
                  !data.length && 'The uploaded package is empty' :
                  'You haven\'t uploaded any package' }
            </p> }
      </div>
      <i className="uil uil-folder-open goto-folder"
        title="Open downloads folder"
        onClick={openFolder}
      />
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

const mapStateToProps = store => store;

export default connect(mapStateToProps)(Package);