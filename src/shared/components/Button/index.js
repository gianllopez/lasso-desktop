import React from 'react';
import cls from 'classnames';
import './index.scss';

export function Button(props) {

  let { label, unicon, className, ...rest } = props;

  return (
    <button className={cls('btn', className)} {...rest}>
      { label }
      { unicon && <i className={unicon}/> }
    </button>
  );

};
