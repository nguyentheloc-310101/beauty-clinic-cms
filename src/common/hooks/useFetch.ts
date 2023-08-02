import { useReducer, useEffect } from "react";

type State<T> = {
  loading: boolean;
  error: Error | null;
  value: T | null;
};

type Action<T> =
  | { type: "setValue"; value: T; error: Error }
  | { type: "start" }
  | { type: "finish"; value: T }
  | { type: "error"; error: Error };

// WARN chưa handle phần push lỗi
export function useFetch<T>(
  fn: Function
): State<T> & { setValue: (value: T) => void } {
  const initialState: State<T> = {
    loading: false,
    error: null,
    value: null,
  };

  const stateReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "setValue":
        return { ...state, loading: true, error: null, value: action.value };
      case "start":
        return { ...state, loading: true, error: null };
      case "finish":
        return { ...state, loading: false, error: null, value: action.value };
      case "error":
        return { ...state, loading: false, error: action.error };
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        dispatch({ type: "start" });
        const { data } = await fn();
        dispatch({
          type: "finish",
          // NOTE map key value to this due to mapping in react
          value: data.map((item: T, i: number) => ({ ...item, key: i })),
        });
      } catch (error) {
        if (error instanceof Error) {
          dispatch({ type: "error", error });
        } else {
          dispatch({
            type: "error",
            error: new Error("An unknown error occurred."),
          });
        }
      }
    };
    asyncFunc();
  }, []);

  const setValue = (value: T) => {
    dispatch({ type: "setValue", value } as any);
  };

  return { ...state, setValue };
}
