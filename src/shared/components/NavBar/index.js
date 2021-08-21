import React from 'react';
import { NavLink } from 'react-router-dom';
import { messageBox } from '../../utils';
import './index.scss';
const { remote: Electron } = window.require('electron');

export function NavBar() {

  const showInformation = () => {
    let { node, electron, chrome } = window.process.versions;
    messageBox({
      type: 'info',
      title: 'Information',
      detail: `Development versions: \
        \nNode: ${node} \
        \nElectron: ${electron} \
        \nChrome: ${chrome}`
      });
  };

  const pageRedirect = () => {
    // Replace with the hosted page.
    Electron.shell.openExternal('https://www.google.com/');
  };

  return (
    <nav className="aside-nav">
      <NavLink
        exact to="/"
        title="Home"
        activeClassName="active"
        className="uil uil-estate"/>
      <NavLink
        to="/package"
        title="Loaded package"  
        activeClassName="active"      
        className="uil uil-box"/>
      <a
        title="Go to package creator"
        className="uil uil-globe"
        onClick={pageRedirect}/>
      <a
        title="Information"
        className="uil uil-info-circle"
        onClick={showInformation}/>
    </nav>
  );

};