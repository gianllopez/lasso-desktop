import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import cls from 'classnames';
import { CLEAR_PACKAGE, SET_PACKAGE } from '../../redux/actions';
import { useStoreState } from '../../shared/hooks/useStoreState';
import { Button, Message, Song } from '../../shared/components';
import { equalObjects } from '../../shared/utils';
import { Editor } from './Editor';
import './index.scss';

function Package() {

  const store = useStoreState(), { loaded, content } = store;
  const dispatch = useDispatch();

  const [data, setData] = useState(content);
  const [editingSong, setEditingSong] = useState(null);
  const [cleared, setCleared] = useState(false);
  const [edited, setEdited] = useState(false);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    let mod = !equalObjects(content, data);
    setModified(mod);
  }, [content, data]);

  const onClear = () => {
    dispatch(CLEAR_PACKAGE);
    setCleared(true);
    setTimeout(() => setCleared(false), 700);
  };

  const editHandler = ({ i: index, ...rest }) => {
    let newData = [ ...data ];
    newData[index] = rest;
    let { i, ...song } = editingSong,   
    eq = equalObjects(rest, song);
    if (!eq) {
      setData(newData);
      setEdited(true);
      setTimeout(() => setEdited(false), 700);
    };
    setEditingSong(null);
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
          disabled={!loaded}
          label="Download all"
          unicon="uil uil-arrow-to-bottom"
          className={cls('dl-all', { 'modified': modified })}
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
              onEdit={() => setEditingSong({ ...song, i })}
            /> )) :
          <p className="missing c-gray">
            You haven't load your package
          </p> }
      </div>
      <Message
        display={edited}
        text="Succesfully edition!"
        unicon="uil uil-check-circle"
      />
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

const mapStateToProps = ({ loaded, content }) => ({ loaded, content });

export default connect(mapStateToProps)(Package);