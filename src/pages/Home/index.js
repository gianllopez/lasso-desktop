import React, { useState } from 'react';
import cls from 'classnames';
import { parse } from '../../services/package';
import homeHero from '../../assets/home-ilustration.svg';
import './index.scss';
const { remote: electron } = window.require('electron');

export function Home() {

  const [path, setPath] = useState('');

  const load = async () => {
    let pkg = electron.dialog.showOpenDialogSync({
      title: 'Package loader',
      properties: ['openFile'],
      filters: [{
        name: 'Lasso JSON Package',
        extensions: ['json']
      }],
      defaultPath: electron.app.getPath('downloads')
    });
    let packageContent = await parse(pkg[0]);
    debugger;
    // setPath(pkg);
  };

  const unload = () => { setPath('') };

  return (
    <div className="home-page" onClick={() => console.log(path)}>
      <div className="hero">
        <div className="title">
          <h1>Lasso</h1>
          <p>The desktop app</p>
        </div>
        <figure>
          <img src={homeHero} alt=""/>
        </figure>
      </div>
      <button className={cls({ 'loaded': path })} onClick={ path ? unload : load }>
        Load package
        <div className="unloader">
          <p>Unload package</p>
          <i className="uil uil-file-times-alt"/>
        </div>
      </button>
    </div>
  );
};
