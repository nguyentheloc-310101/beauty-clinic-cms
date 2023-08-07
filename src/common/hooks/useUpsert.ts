import { supabase, uploadImage } from "@/services";
import { useReducer, useEffect } from "react";
import { useMessageContext } from "../providers/message";
var lodashGet = require("lodash.get");
var lodashSet = require("lodash.set");
// import get from "lodash.get";

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
  imageAttributeNames: string[]
): State<T> & { upsert: (value: T) => void } {
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

  // NOTE upload all image to UploadCare using lodash
  const imageProcessing = async (value: T) => {
    for (const path of imageAttributeNames) {
      // get nested attribute of value
      const item = lodashGet(value, path);

      let filePaths: string[] = [];
      if (Array.isArray(item)) filePaths = item;
      else filePaths.push(item);

      for (const filePath of filePaths) {
        if (!filePath.startsWith("blob")) continue;

        // TODO implement delete image when update

        const file = await fetch(filePath).then((r) => r.blob());
        const url = await uploadImage(file);

        lodashSet(value, path, url);
        URL.revokeObjectURL(filePath);
      }
    }
  };
  const upsert = async (value: T) => {
    message.loading("Đang upload...");

    imageProcessing(value);
    console.warn(state.value);

    dispatch({ type: "upsert" });
    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert({ [KEY]: key, [DATA]: value });
    message.destroy();
    if (error) message.error("Lỗi xảy ra");
    else message.success("Lưu thành công!");
  };
  return { ...state, upsert };
}
