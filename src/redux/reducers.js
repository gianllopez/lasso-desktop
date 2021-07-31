

const INITIAL_PACKAGE = {
  loaded: false,
  content: []
};

function packageReducer(state = INITIAL_PACKAGE, action) {
  switch (action.type) {
    case '@package/set':
      let { path, ...rest } = action.payload;
      return { ...rest, path: path || state.path };
    case '@package/clear':
      return INITIAL_PACKAGE;
    default:
      return state;
  };
};

const INITIAL_QUEUE = {
  downloading: false,
  queue: []
};

function queueReducer(state = INITIAL_QUEUE, action) {
  switch (action.type) {
    case '@queue/set':
      return action.payload;
    default:
      return state;
  };
};

export { packageReducer, queueReducer };