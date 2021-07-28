import React, { useEffect, useState } from 'react';
import cls from 'classnames';
import { TagInput } from './TagInput';
import { Button } from '../../../shared/components/Button'
import './index.scss';

export function Editor(props) {

  let { data, toClose } = props;

  const [edition, setEdition] = useState(data);

  useEffect(() => setEdition(data), [data]);

  const changeHandler = e => {
    let { name, value } = e.target;
    setEdition({ ...edition, [name]: value });
  };

  return (
    <div className={cls('modal', { 'open': data })}>
      <div className="content">
        <div className="header-text" onClick={() => console.log(edition, data)}>
          <h2>Package song editor</h2>
          <p>You're editing:</p>
        </div>
        <div className="entries">
          <TagInput
            valid={edition.cover?.length > 0}            
            value={edition.cover || ''}
            onChange={changeHandler}
            placeholder="Cover"
            name="cover"
          />
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
          />
          <Button
            className="save-edit"
            label="Save edition"
          />
        </div>
        <i className="uil uil-times-circle" onClick={toClose}/>        
      </div>
    </div>
  );

};