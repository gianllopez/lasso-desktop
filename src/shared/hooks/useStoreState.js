import { useStore } from 'react-redux';

export function useStoreState() {
  const store = useStore(),
  state = store.getState() || [];
  return state[0] || {};
};