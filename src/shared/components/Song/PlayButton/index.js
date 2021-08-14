import React, { useState } from 'react';
import './index.scss';

export function PlayButton(props) {

  const [paused, setPaused] = useState(false);

  return (
    <div className="play-btn" onClick={() => setPaused(!paused)}>
      { paused ?
        <i className="uil uil-play"/> :
        <i className="uil uil-pause"/> }
    </div>
  );

};
