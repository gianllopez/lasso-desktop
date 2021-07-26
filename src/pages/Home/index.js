import React, { useState } from 'react';
import cls from 'classnames';
import homeHero from '../../assets/home-ilustration.svg';
import './index.scss';
const { remote: electron } = window.require('electron');
const fs = window.require('fs');

export function Home() {

  const [pkg, setPkg] = useState([]);

  const load = async () => {
    let path = electron.dialog.showOpenDialogSync({
      title: 'Package loader',
      properties: ['openFile'],
      filters: [{
        name: 'Lasso JSON Package',
        extensions: ['json']
      }],
      defaultPath: electron.app.getPath('downloads')
    });
    fs.readFile(path[0], 'utf-8', (err, data) => {
      setPkg(data || []);
    });
  };

  const unload = () => { setPkg([]) };

  return (
    <div className="home-page">
      <div className="hero">
        <div className="title">
          <h1>Lasso</h1>
          <p>The desktop app</p>
        </div>
        <figure>
          <img src={homeHero} alt=""/>
        </figure>
      </div>
      <button className={cls({ 'loaded': pkg?.length })} onClick={ pkg.length ? unload : load }>
        Load package
        <div className="unloader">
          <p>Unload package</p>
          <i className="uil uil-file-times-alt"/>
        </div>
      </button>
    </div>
  );
};
