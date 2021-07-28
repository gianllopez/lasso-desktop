import React from 'react';
import cls from 'classnames';
import './index.scss';

export function Message(props) {

  let { text, unicon, display, ...rest } = props;

  return (
    <div className={cls('message', { 'display': display })} {...rest}>
      <p>{ text }</p>
      <i className={ unicon }/>
    </div>
  );

};
