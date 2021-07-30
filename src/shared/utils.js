import { store } from '../redux/store';

const { remote: electron } = window.require('electron'),
{ dialog } = electron;
const fs = window.require('fs').promises;

function fileLoader(filter, defPath = 'downloads') {

  const defaultFilter = {
    name: 'Lasso JSON Package',
    extensions: ['json']
  },

  path = dialog.showOpenDialogSync({
    title: 'Package loader',
    properties: ['openFile'],
    filters: [ filter || defaultFilter ],
    defaultPath: electron.app.getPath(defPath)
  });

  return path ? path[0] : '';

};

function messageBox(config) {
  dialog.showMessageBox({
    message: 'Lasso - Downloader',
    ...config
  })
};

const equalObjects = (obj1, obj2) => (
  JSON.stringify(obj1) === JSON.stringify(obj2)
);

export { fileLoader, messageBox, equalObjects };