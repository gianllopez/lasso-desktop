const { default: devtools, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
  let win = new BrowserWindow({
    width: 950, height: 700,
    icon: path.join(__dirname, 'icon.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });
  let indexPath = `file://${path.join(__dirname, '../build/index.html')}`;
  win.loadURL(isDev ? 'http://localhost:3000' : indexPath);
  require('@electron/remote/main').initialize();
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

app.on('ready', () => {  
  createWindow();
  if (isDev) {
    devtools([REACT_DEVELOPER_TOOLS,  REDUX_DEVTOOLS])
      .then(name => console.log(`DevTools was added: ${name}!`))
      .catch(e => console.error(e));
  };
});