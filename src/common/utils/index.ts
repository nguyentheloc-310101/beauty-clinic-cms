export * from "./cn";
export * from "./image-processing";
export * from "./format-date";

export function getIdFromSupabaseStorage(url: string): string {
  try {
    let pattern = /public\/aura\/(.*)/;
    let match = url?.match(pattern);
    return match?.[1] ?? "";
  } catch (error) {
    console.error(error);
    return "";
  }
}
