import React from 'react';
import cls from 'classnames';
import './index.scss';

export function TagInput(props) {

  let { placeholder, value, ...rest } = props,
  filled = value.length > 0;

  return (
    <div className="tag-input">
      <input
        type="text"
        value={value}
        className={cls({ 'filled': filled })}
        autoComplete="off"
        spellCheck="false"
        {...rest}
      />
      <label>{ placeholder }</label>
    </div>
  );

};





