import { supabase } from "@/services";
import { useReducer, useEffect } from "react";
import { useMessageContext } from "../providers/message";
import { imageProcessing } from "../utils";

const TABLE_NAME = "data";
const KEY = "key";
const DATA = "data";

type State<T> = {
  loading: boolean;
  error: Error | null;
  value: T | null;
  id: string | number | null;
};

type Action<T> =
  | { type: "upsert" }
  | { type: "start" }
  | { type: "finish"; value: T }
  | { type: "error"; error: Error };

// WARN not handled error yet
export function useUpsert<T>(
  key: string,
  imageAttributeNames: (string | string[])[]
): State<T> & { upsert: (value: T) => Promise<void> } {
  const initialState: State<T> = {
    loading: false,
    error: null,
    value: null,
    id: null,
  };

  const stateReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "upsert":
        return { ...state };
      case "start":
        return { ...state, loading: true, error: null };
      case "finish":
        return { ...state, loading: false, error: null, value: action.value };
      case "error":
        return { ...state, loading: false, error: action.error };
    }
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);
  const { message } = useMessageContext();

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        dispatch({ type: "start" });
        const { data } = await supabase.from(TABLE_NAME).select().eq(KEY, key);
        dispatch({
          type: "finish",
          value: data?.[0][DATA],
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

  const upsert = async (value: T) => {
    message.loading({ key: "loading", content: "Đang upload..." });

    await imageProcessing(value, imageAttributeNames);

    dispatch({ type: "upsert" });
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert({ [KEY]: key, [DATA]: value });

    message.destroy("loading");
    if (error) message.error("Lỗi xảy ra");
    else message.success("Lưu thành công!");
  };
  return { ...state, upsert };
}
