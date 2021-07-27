const SET_PACKAGE = pkg => ({
  type: '@package/set',
  payload: pkg
});

const CLEAR_PACKAGE = () => ({
  type: '@package/clear',
  payload: []
});

export { SET_PACKAGE, CLEAR_PACKAGE };