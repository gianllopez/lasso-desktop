import { useStore } from 'react-redux';

export function useStoreState() {
  const store = useStore();
  return store.getState() || [];
};