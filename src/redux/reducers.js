function packageReducer(state = [], action) {
  switch (action.type) {
    case '@package/set':
      return state.concat(action.payload);
    case '@package/clear':
      return [];
    default:
      return state;
  };
};

export { packageReducer };