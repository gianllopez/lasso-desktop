const INITIAL_PACKAGE = {
  loaded: false,
  path: '',
  content: [],
  downloading: false
};

function packageReducer(state = INITIAL_PACKAGE, action) {
  switch (action.type) {
    case '@package/set':
      let { path, ...rest } = action.payload;
      return { ...rest, path: path || state.path };
    case '@package/clear':
      let { folder } = state; 
      return { ...INITIAL_PACKAGE, folder, path: state.path };
    case '@package/download':
      return { ...state, downloading: !state.downloading };
    default:
      return state;
  };
};

export { packageReducer };