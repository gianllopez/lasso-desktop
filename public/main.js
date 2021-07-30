const { default: devtools, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
const { app, BrowserWindow } = require('electron'),
isDev = require('electron-is-dev'),
path = require('path');

function createWindow() {
  let win = new BrowserWindow({
    width: 950, height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });
  win.loadURL(
    isDev ?
      'http://localhost:3000' :
      `file://${path.join(__dirname, '../build/index.html')}`);
};

app.whenReady().then(() => {
  createWindow();
  devtools([REACT_DEVELOPER_TOOLS,  REDUX_DEVTOOLS])
    .then(name => console.log(`DevTools was added: ${name}!`))
    .catch(e => console.error(e));
});

