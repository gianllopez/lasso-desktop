import React from 'react';
import homeHero from '../../assets/home-ilustration.svg';
import './index.scss';

export function Home() {
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
      <button className="loadpkg-btn">
        Load package
      </button>
    </div>
  );
};
