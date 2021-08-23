const SET_PACKAGE = (pkg, path = '', folder) => ({
  type: '@package/set',
  payload: {
    loaded: true,
    content: pkg,
    path, folder
  }
});

const CLEAR_PACKAGE = {
  type: '@package/clear'
};

const DOWNLOAD = {
  type: '@package/download'
};

export { SET_PACKAGE, CLEAR_PACKAGE, DOWNLOAD };