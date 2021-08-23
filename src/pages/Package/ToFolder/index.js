import React from 'react';
import { manageFolder } from '../../../shared/utils';
import './index.scss';

const electron = window.require('electron').remote;

export function ToFolder() {
  
  const openFolder = () => {
    let dlfolder = manageFolder();
    electron.shell.openPath(dlfolder);
  };
  
  return (
    <i className="uil uil-folder-open to-folder"
      title="Open downloads folder"
      onClick={openFolder}
    />
  );

};
