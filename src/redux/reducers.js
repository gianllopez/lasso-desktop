const INITIAL_PACKAGE = {
  loaded: false,
  path: '',
  content: []
};

function packageReducer(state = INITIAL_PACKAGE, action) {
  switch (action.type) {
    case '@package/set':
      let { path, ...rest } = action.payload;
      return { ...rest, path: path || state.path };
    case '@package/clear':
      let { folder } = state; 
      return { ...INITIAL_PACKAGE, folder, path: state.path };
    default:
      return state;
  };
};

export { packageReducer };