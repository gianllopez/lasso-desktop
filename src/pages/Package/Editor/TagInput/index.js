import React from 'react';
import cls from 'classnames';
import './index.scss';

export function TagInput(props) {

  let { placeholder, valid, ...rest } = props;

  return (
    <div className={cls('tag-input', { 'valid': valid })}>
      <input type="text" autocomplete="off" {...rest}/>
      <label>{ placeholder }</label>
    </div>
  );

};





