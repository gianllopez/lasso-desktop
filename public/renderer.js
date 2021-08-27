const { dialog, getCurrentWindow } = window.require('electron').remote;

const onDisconnected = () => {
  dialog.showErrorBox(
    'You\'re offline!',
    'Please, establish an internet connection and try again :|');
  getCurrentWindow().close();
};

window.addEventListener('load', () => {
  if (!navigator.onLine) onDisconnected();
});
window.addEventListener('offline', onDisconnected);
