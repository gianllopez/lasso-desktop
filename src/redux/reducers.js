const INITIAL_STATE = {
  loaded: false,
  path: '',
  folder: '',
  content: [],
  downloading: false
};

function packageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@package/set':
      return { ...action.payload, loaded: true };
    case '@package/clear': 
      return INITIAL_STATE;
    case '@package/download':
      return { ...state, downloading: !state.downloading };
    default:
      return state;
  };
};

export { packageReducer };