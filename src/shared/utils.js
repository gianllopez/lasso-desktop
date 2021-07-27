const { remote: electron } = window.require('electron');

function fileLoader() {
  let path = electron.dialog.showOpenDialogSync({
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

export { fileLoader };