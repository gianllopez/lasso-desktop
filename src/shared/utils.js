const { remote: electron } = window.require('electron'),
{ dialog } = electron;

function fileLoader() {
  let path = dialog.showOpenDialogSync({
    title: 'Package loader',
    properties: ['openFile'],
    filters: [{
      name: 'Lasso JSON Package',
      extensions: ['json']
    }],
    defaultPath: electron.app.getPath('downloads')
  });
  return path;
};

function messageBox(config) {
  dialog.showMessageBox({
    message: 'Lasso - Downloader',
    ...config    
  })
};

export { fileLoader, messageBox };