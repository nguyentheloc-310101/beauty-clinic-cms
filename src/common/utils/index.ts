export * from "./cn";

export function getIdFromSupabaseStorage(url: string): string {
  try {
    let pattern = /public\/aura\/(.*)/;
    let match = url?.match(pattern);
    return match?.[1] ?? "";
  } catch (error) {
    console.log(error);
    return "";
  }
}
