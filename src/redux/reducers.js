
const INITIAL_STATE = {
  loaded: false,
  content: []
};

function packageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@package/set':
      let { path, ...rest } = action.payload;
      return { ...rest, path: path || state.path };
    case '@package/clear':
      return INITIAL_STATE;
    default:
      return state;
  };
};

export { packageReducer };