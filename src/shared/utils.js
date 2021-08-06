const { remote: electron } = window.require('electron'),
{ app, dialog } = electron;

const path = window.require('path');

const fs = window.require('fs');

function fileLoader(filter, defPath = 'downloads') {

  const defaultFilter = {
    name: 'Lasso JSON Package',
    extensions: ['json']
  },

  pkgpath = dialog.showOpenDialogSync({
    title: 'Package loader',
    properties: ['openFile'],
    filters: [ filter || defaultFilter ],
    defaultPath: app.getPath(defPath)
  }),

  folder = app.getPath('documents');
  
  return {
    path: pkgpath ? pkgpath[0] : '',
    folder: path.join(folder, 'Lasso Downloads')
  };

};

function createFolder(folder) {
  let exists = fs.existsSync(folder);
  if (!exists) fs.mkdirSync(folder);
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

export { fileLoader, createFolder, messageBox, equalObjects };