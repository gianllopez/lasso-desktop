const SET_PACKAGE = (pkg, path = '') => ({
  type: '@package/set',
  payload: { loaded: true, content: pkg, path }
});

const CLEAR_PACKAGE = {
  type: '@package/clear',
  payload: { loaded: false, content: [] }
};

const SET_QUEUE = pkg => ({
  type: '@queue/set',
  payload: { downloading: true, queue: pkg }
});

export { SET_PACKAGE, CLEAR_PACKAGE, SET_QUEUE };