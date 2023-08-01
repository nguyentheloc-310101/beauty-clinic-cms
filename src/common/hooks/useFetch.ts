import { useReducer } from "react";
import { useEffect } from "react";

type State<T> = {
  loading: boolean;
  error: any;
  value: T;
};
export function useFetch<T>(fn: () => T) {
  const initialState: State<T> = {
    loading: false,
    error: null,
    value: {} as T,
  };
  const stateReducer = (_: any, action: any) => {
    switch (action.type) {
      case "setData":
        return { loading: true, error: null, value: action.value as T };
      case "start":
        return { loading: true, error: null, value: null };
      case "finish":
        return { loading: false, error: null, value: action.value };
      case "error":
        return { loading: false, error: action.error, value: null };
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        dispatch({ type: "start" });
        const value = fn();
        dispatch({ type: "finish", value });
      } catch (error) {
        dispatch({ type: "error", error });
      }
    };
    asyncFunc();
  }, []);
  const setData = (value: T) => {
    dispatch({ type: "setData", value });
  };

  return { ...state, setData };
}
