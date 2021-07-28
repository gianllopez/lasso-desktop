const SET_PACKAGE = pkg => ({
  type: '@package/set',
  payload: { loaded: true, content: pkg }
});

const CLEAR_PACKAGE = {
  type: '@package/clear',
  payload: { loaded: false, content: [] }
};

export { SET_PACKAGE, CLEAR_PACKAGE };