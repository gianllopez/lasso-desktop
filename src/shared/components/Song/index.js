import React, { useEffect, useState } from 'react';
import { Download } from '../../../services/download';
import { CircularProgressbar } from 'react-circular-progressbar';
import defaultCover from '../../../assets/default-cover.jpg'
import 'react-circular-progressbar/dist/styles.css';
import './index.scss';

const NodeID3 = window.require('node-id3');

export function Song(props) {

  let { data, onDelete, onEdit } = props,
  { title, artist, album, cover, url } = data;

  // queued needed props:
  let { queued, downloading, turn, onComplete } = props;

  const [state, setState] = useState({});

  const handler = newState => setState({ ...state, ...newState });
  
  useEffect(() => {
    if (turn) {
      async function fetchSong() {
        let dlservice = new Download(handler),
        mp3title = `${title} - ${artist}`,
        mp3path = await dlservice.get_mp3(url, mp3title),
        tags = { title, artist, album, APIC: cover };
        await NodeID3.Promise.write(tags, mp3path);
        onComplete();
      };
      fetchSong();
    };
  }, [downloading, turn]);

  return (
    <div className="song">
      <figure>
        <img src={cover !== 'default' ? cover : defaultCover} alt=""/>
      </figure>
      <div className="tags">
        <p className="title">{ title }</p>
        <p className="artist">{ artist }</p>
        <p className="album">{ album }</p>
      </div>
      <div className="actions">
        { queued ?
          turn ?
            <div className="pgb">
              <CircularProgressbar
                value={state.progress || 0}
                strokeWidth="15"
              />
            </div> : <i className="uil uil-clock-eight"/> :
          <i className="uil uil-edit-alt edit" onClick={onEdit}/> }
        <i onClick={onDelete} className="uil uil-trash-alt delete"/> 
      </div>
    </div>
  );

};
