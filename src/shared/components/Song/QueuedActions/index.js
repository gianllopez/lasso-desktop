import React from 'react';
import { Fragment } from 'react';

export function QueuedActions(props) {

  let { paused, downloading, onPause } = props;

  return (
    <Fragment>
      { downloading ?
        <i className={`uil uil-${paused ? 'play' : 'pause'} p-action`} onClick={onPause}/> :
        <i className="uil uil-clock-eight wait"/> }
    </Fragment>
  );

};
