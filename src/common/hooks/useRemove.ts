import { supabase } from "@/services";
import { useReducer, useEffect } from "react";
import { useMessageContext } from "../providers/message";

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
  | { type: "selectKeys"; value: T }
  | { type: "selectAll"; value: T }
  | { type: "select"; value: T }
  | { type: "start" }
  | { type: "finish"; value: T }
  | { type: "error"; error: any };

// WARN not handled error yet
// TODO handle error
export function useRemove<T extends Item[]>(
  tableName: string,
  imageAttributeNames: string[],
  selectString?: string
): State<T> & { remove: () => void } & {
  select: (id: number, isSelected?: boolean) => void;
} & {
  selectAll: (isSelected: boolean) => void;
} & { selectKeys: (keys: number[]) => void } {
  const initialState: State<T> = {
    loading: false,
    error: null,
    value: null,
    id: null,
  };

  const stateReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "selectKeys":
        return { ...state, value: action.value };
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
      const { data, error } = await supabase
        .from(tableName)
        .select(selectString ?? "");

      if (!error)
        dispatch({
          type: "finish",
          value: data!.map((item: any, i) => ({ ...item, key: i })) as T,
        });
      else dispatch({ type: "error", error });
    };
    asyncFunc();
  }, []);

  const remove = async () => {
    const removedValue = state.value?.filter((item) => item.isSelected) ?? [];

    const { error } = await supabase
      .from(tableName)
      .delete()
      .in("id", [removedValue.map((item) => item.id)]);
    // TODO make more clear message for user if there reference error
    if (error) message.error(error.message);
    else
      dispatch({
        type: "remove",
        value: state.value
          ?.filter((item) => !item.isSelected)
          .map((item, i) => ({ ...item, key: i })) as any,
      });
  };

  const select = (id: number, isSeleted?: boolean) => {
    const tempData = JSON.parse(JSON.stringify(state.value));
    tempData[id].isSelected =
      isSeleted != null ? isSeleted : !tempData[id].isSelected;

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
  const selectKeys = (keys: number[]) => {
    dispatch({
      type: "selectKeys",
      value: state.value
        ?.map((item) => ({
          ...item,
          isSelected: false,
        }))
        .map((item, i) => ({
          ...item,
          isSelected: keys.includes(i),
        })) as T,
    });
  };

  return { ...state, remove, select, selectAll, selectKeys };
}
