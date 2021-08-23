import React from 'react';
import { connect, useDispatch } from 'react-redux';
import cls from 'classnames';
import { SET_PACKAGE, CLEAR_PACKAGE } from '../../redux/actions';
import { manageFolder, fileLoader } from '../../shared/utils';
import homeHero from '../../assets/home-hero.svg';
import './index.scss';

const fs = window.require('fs');

function Home({ loaded }) {

  const dispatch = useDispatch();

  const load = () => {
    let { path, folder } = fileLoader();
    if (path) {
      let data = fs.readFileSync(path),
      content = JSON.parse(data);
      manageFolder();
      dispatch(SET_PACKAGE({ path, folder, content }));
    };
  };

  const unload = () => dispatch(CLEAR_PACKAGE);

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
      <button className={cls({ 'loaded': loaded })}
        onClick={loaded ? unload : load}>
        Load package
        <div className="unloader">
          <p>Unload package</p>
          <i className="uil uil-file-times-alt"/>
        </div>
      </button>
    </div>
  );

};

const mapStateToProps = ({ loaded }) => ({ loaded });  

export default connect(mapStateToProps)(React.memo(Home));