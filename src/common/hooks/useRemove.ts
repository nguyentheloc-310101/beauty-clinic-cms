import { supabase, uploadImage } from "@/services";
import { useReducer, useEffect } from "react";
import { useMessageContext } from "../providers/message";
var lodashGet = require("lodash.get");
var lodashSet = require("lodash.set");

interface Item {
  isSelected: boolean;
  id: string;
}

type State<T> = {
  loading: boolean;
  error: Error | null;
  value: T | null;
  id: string | number | null;
};

type Action<T> =
  | { type: "remove"; value: T }
  | { type: "selectAll"; value: T }
  | { type: "select"; value: T }
  | { type: "start" }
  | { type: "finish"; value: T }
  | { type: "error"; error: any };

// WARN not handled error yet
// TODO handle error
export function useRemove<T extends Item[]>(
  tableName: string,
  imageAttributeNames: string[]
): State<T> & { remove: () => void } & {
  select: (id: number) => void;
} & {
  selectAll: (isSelected: boolean) => void;
} {
  const initialState: State<T> = {
    loading: false,
    error: null,
    value: null,
    id: null,
  };

  const stateReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "selectAll":
        return { ...state, value: action.value };
      case "select":
        return { ...state, value: action.value };
      case "remove":
        return { ...state, value: action.value };

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
      dispatch({ type: "start" });
      const { data, error } = await supabase.from(tableName).select();

      if (!error)
        dispatch({
          type: "finish",
          value: data as T,
        });
      else dispatch({ type: "error", error });
    };
    asyncFunc();
  }, []);

  const remove = async () => {
    const removedValue = state.value!.filter((item) => item.isSelected);
    await supabase
      .from(tableName)
      .delete()
      .in("id", [removedValue.map((item) => item.id)]);
    dispatch({
      type: "remove",
      value: removedValue as T,
    });
  };

  const select = (id: number) => {
    const tempData = JSON.parse(JSON.stringify(state.value));
    tempData[id].isSelected = !tempData[id].isSelected;

    dispatch({ type: "select", value: tempData });
  };

  const selectAll = (isSeleted: boolean) => {
    dispatch({
      type: "selectAll",
      value: state.value?.map((item) => ({
        ...item,
        isSelected: isSeleted,
      })) as T,
    });
  };

  return { ...state, remove, select, selectAll };
}
