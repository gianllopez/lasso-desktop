const { remote: electron } = window.require('electron'),
{ dialog } = electron;

function fileLoader(filter) {

  const defaultFilter = {
    name: 'Lasso JSON Package',
    extensions: ['json']
  },

  path = dialog.showOpenDialogSync({
    title: 'Package loader',
    properties: ['openFile'],
    filters: [ filter || defaultFilter ],
    defaultPath: electron.app.getPath('downloads')
  });

  return path ? path[0] : '';

};

function messageBox(config) {
  dialog.showMessageBox({
    message: 'Lasso - Downloader',
    ...config
  })
};

export { fileLoader, messageBox };