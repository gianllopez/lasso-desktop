import React from 'react';
import cls from 'classnames';
import './index.scss';

export function TagInput(props) {

  let { placeholder, valid, ...rest } = props;

  return (
    <div className="tag-input">
      <input
        type="text"
        className={cls({ 'valid': valid })}
        autoComplete="off"
        spellCheck="false"
        {...rest}
      />
      <label>{ placeholder }</label>
    </div>
  );

};





