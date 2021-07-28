import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SET_PACKAGE, CLEAR_PACKAGE } from '../../redux/actions';
import cls from 'classnames';
import { fileLoader, messageBox } from '../../shared/utils';
import homeHero from '../../assets/home-ilustration.svg';
import './index.scss';

const fs = window.require('fs');

export function Home() {

  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const load = () => {
    let path = fileLoader();
    fs.readFile(path ? path[0] : '', 'utf-8', (err, data) => {
      let parsedPackage = JSON.parse(data);
      if (parsedPackage.length === 0) {
        messageBox({
          type: 'error',
          title: 'Empty package',
          detail: "You're trying to load an empty package."
        });
      } else {
        dispatch(SET_PACKAGE(parsedPackage || []));
        setLoaded(true);
      };
    });
  };

  const unload = () => {
    dispatch(CLEAR_PACKAGE);
    setLoaded(false);
  };

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
      <button className={cls({ 'loaded': loaded })} onClick={ loaded ? unload : load }>
        Load package
        <div className="unloader">
          <p>Unload package</p>
          <i className="uil uil-file-times-alt"/>
        </div>
      </button>
    </div>
  );

};
