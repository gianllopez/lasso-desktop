import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import { TagInput } from './TagInput';
import { Button } from '../../../shared/components/Button'
import { fileLoader } from '../../../shared/utils';
import defCover from '../../../assets/default-cover.jpg'
import './index.scss';

const fs = window.require('fs');

export function Editor(props) {

  let { data, toClose, onSave } = props;

  const [edition, setEdition] = useState(data);
  const [loadedCover, setLoadedCover] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => { data && setEdition(data) }, [data]);

  useEffect(() => {
    let values = Object.values(edition),
    validation = values.every(field => field !== '');
    if (valid !== validation) {
      setValid(validation);
    };
  }, [edition, valid])

  const changeHandler = e => {
    let { name, value } = e.target;
    setEdition({ ...edition, [name]: value });
  };

  const onUploadCover = () => {
    let cover = fileLoader({
      name: 'Cover/Image',
      extensions: [ 'jpg', 'png' ]
    }, 'pictures');
    if (cover) {
      let buffer = fs.readFileSync(cover),
      file = new File([buffer], cover),
      url = URL.createObjectURL(file);
      setEdition({ ...edition, cover: url });
      setLoadedCover(cover);
    };
  };

  const cover404 = ({ target }) => {
    target.src = defCover;
    setEdition({ ...edition, cover: defCover });
  };

  return (
    <div className={cls('modal', { 'open': data })}>
      <div className="content">
        <div className="header-text">
          <h2>Package song editor</h2>
          <p className="c-gray">{data.title} - {data.artist}</p>
        </div>
        <div className="entries">
          <div className="cover-input">
            <TagInput
              valid={edition.cover?.length > 0}
              value={loadedCover || edition.cover || ''}
              onChange={changeHandler}
              placeholder="Cover"
              name="cover"
            />
            <figure onClick={onUploadCover}>
              <img src={edition.cover} onError={cover404} alt=""/>
            </figure>
          </div>
          <TagInput
            valid={edition.title?.length > 0}
            value={edition.title || ''}
            onChange={changeHandler}
            placeholder="Title"
            name="title"
          />
          <TagInput
            valid={edition.artist?.length > 0}
            value={edition.artist || ''}
            onChange={changeHandler}
            placeholder="Artist" 
            name="artist"
          />
          <TagInput
            valid={edition.album?.length > 0}
            value={edition.album || ''}
            onChange={changeHandler}
            placeholder="Album"
            name="album"
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
            disabled={!valid}
          />
        </div>
        <i className="uil uil-times-circle" onClick={toClose}/>        
      </div>
    </div>
  );

};