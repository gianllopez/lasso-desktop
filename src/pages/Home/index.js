import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { SET_PACKAGE, CLEAR_PACKAGE, CLEAR_QUEUE } from '../../redux/actions';
import cls from 'classnames';
import { manageFolder, fileLoader, messageBox } from '../../shared/utils';
import homeHero from '../../assets/home-ilustration.svg';
import './index.scss';

const fs = window.require('fs');

function Home({ loaded }) {

  const dispatch = useDispatch();

  const load = () => {
    let { path, folder } = fileLoader();
    if (!path) return;
    let data = fs.readFileSync(path),
    parsedPackage = JSON.parse(data || []);
    if (parsedPackage.length === 0) {
      messageBox({
        type: 'error', title: 'Empty package',
        detail: "You're trying to load an empty package."
      });
    } else {
      dispatch(SET_PACKAGE(parsedPackage, path, folder));
      dispatch(CLEAR_QUEUE);
      manageFolder();
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

const mapStateToProps = ({ package: { loaded } }) => ({ loaded });

export default connect(mapStateToProps)(React.memo(Home));