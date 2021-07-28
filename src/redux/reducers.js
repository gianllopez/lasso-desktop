
const INITIAL_STATE = {
  loaded: false,
  content: []
};

function packageReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@package/set':      
      return state.content?.concat(action.payload);
    case '@package/clear':
      return INITIAL_STATE;
    default:
      return state;
  };
};

export { packageReducer };