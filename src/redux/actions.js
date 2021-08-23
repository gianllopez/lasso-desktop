const SET_PACKAGE = payload => ({
  type: '@package/set',
  payload: { loaded: true, ...payload }
});

const CLEAR_PACKAGE = {
  type: '@package/clear'
};

const DOWNLOAD = {
  type: '@package/download'
};

export { SET_PACKAGE, CLEAR_PACKAGE, DOWNLOAD };