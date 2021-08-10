import React, { useEffect } from 'react';
import defaultCover from '../../../assets/default-cover.jpg'
import { Download } from '../../../services/download';
import './index.scss';

export function Song(props) {

  let { data, onDelete, onEdit } = props,
  { title, artist, album, cover, url } = data;

  // queued needed props:
  let { turn, onComplete } = props;

  const handler = state => {
    console.log(state);
  };
  
  useEffect(() => {
    if (turn) {
      async function fetchSong() {
        let service = new Download(handler),
        mp3Title = `${title} - ${artist}`;
        await service.get_mp3(url, mp3Title);
        onComplete();
      };
      fetchSong();
    };
  }, [turn]);


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
        <i className="uil uil-edit-alt edit" onClick={onEdit}/>
        <i onClick={onDelete} className="uil uil-trash-alt delete"/> 
      </div>
    </div>
  );

};
