import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import { TagInput } from './TagInput';
import { Button } from '../../../shared/components/Button'
import { fileLoader, notFoundCover } from '../../../shared/utils';
import './index.scss';

const fs = window.require('fs');

export function Editor(props) {

  let { data, toClose, onSave } = props;

  const [edition, setEdition] = useState(data);
  const [coverPreview, setCoverPreview] = useState(null);

  useEffect(() => {
    if (data) {
      setEdition(data);
      setCoverPreview(data.cover);
    };
  }, [data]);

  const changeHandler = e => {
    let { name, value } = e.target,
    newData = { ...edition, [name]: value };
    if (name === 'cover') {
      newData.coverpath = value;
      setCoverPreview(value);
    };
    setEdition(newData);
  };

  const onUploadCover = () => {
    let cnf = { name: 'Cover', extensions: ['jpg', 'png'] },
    { path } = fileLoader(cnf, 'pictures');
    if (path) {
      let buffer = fs.readFileSync(path),
      file = new File([buffer], path),
      url = URL.createObjectURL(file);
      setEdition({ ...edition, cover: url, coverpath: path });
      setCoverPreview(url);
    };
  };

  const closeHandler = () => {
    toClose();
    setEdition(null);
    setCoverPreview(null);
  };

  return (
    <div className={cls('modal', { 'open': data })}>
      <div className="content">
        <div className="header-info">
          <h2>Package song editor</h2>
          <p className="c-gray">
            {edition?.title} - {edition?.artist}
          </p>
        </div>
        <div className="entries">
          <div className="cover-input">
            <TagInput
              name="cover"
              placeholder="Cover"
              onChange={changeHandler}
              value={edition?.coverpath || edition?.cover || ''}
            />
            <figure onClick={onUploadCover}>
              <img src={coverPreview} onError={notFoundCover} alt=""/>
            </figure>
          </div>
          <TagInput            
            value={edition?.title || ''}
            onChange={changeHandler}
            placeholder="Title"
            name="title"
          />
          <TagInput            
            value={edition?.artist || ''}
            onChange={changeHandler}
            placeholder="Artist" 
            name="artist"
          />
          <TagInput            
            value={edition?.album || ''}
            onChange={changeHandler}
            placeholder="Album"
            name="album"
          />
          <TagInput            
            value={edition?.url || ''}
            onChange={changeHandler}
            placeholder="Youtube URL"
            name="url"
          />
        </div>
        <div className="grouped-btns">
          <Button
            className="cancel-edit"
            label="Cancel"
            onClick={toClose}
          />
          <Button
            className="save-edit"
            label="Save edition"
            onClick={() => onSave(edition)}
          />
        </div>
        <i className="uil uil-times-circle" onClick={closeHandler}/>        
      </div>
    </div>
  );

};