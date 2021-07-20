import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
const { remote: Electron } = window.require('electron');

export function NavBar() {

  const showInformation = e => {
    e.preventDefault();
    let { node, electron, chrome } = window.process.versions;
    Electron.dialog.showMessageBox({
      type: 'info',
      title: 'Information',
      message: 'Lasso - Downloader',
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
      <Link
        to="/"
        title="Home"
        className="uil uil-estate"/>
      <Link
        to="/package"
        title="Loaded package"
        className="uil uil-box"/>
      <Link
        to="/queue"
        title="Downloads queue"
        className="uil uil-layer-group"/>
      <a
        to="/"
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