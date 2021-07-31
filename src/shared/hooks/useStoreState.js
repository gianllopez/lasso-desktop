import { useStore } from 'react-redux';

export function useStoreState(section) {
  const store = useStore(),
  state = store.getState();
  return state[section] || [];
};