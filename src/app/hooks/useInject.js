import { useEffect } from "react";
import { useStore } from "react-redux";

export const useInject = ({ key, reducer, saga }) => {
  const store = useStore();

  useEffect(() => {
    if (reducer) store.injectReducer( key, reducer);
    if (saga) store.injectSaga( key, saga);
  }, [store, key, reducer, saga]);
};