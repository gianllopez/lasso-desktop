const SET_PACKAGE = (pkg, path = '') => ({
  type: '@package/set',
  payload: { loaded: true, content: pkg, path }
});

const CLEAR_PACKAGE = { type: '@package/clear' };

const SET_QUEUE = pkg => ({
  type: '@queue/set',
  payload: { downloading: false, queue: pkg }
});

const CLEAR_QUEUE = { type: '@queue/clear' };

const PAUSE_QUEUE = { type: '@queue/pause-start' };

export { SET_PACKAGE, CLEAR_PACKAGE, SET_QUEUE, CLEAR_QUEUE, PAUSE_QUEUE };