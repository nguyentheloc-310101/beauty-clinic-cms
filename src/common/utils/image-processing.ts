import { uploadImage } from "@/services";
var lodashGet = require("lodash.get");
var lodashSet = require("lodash.set");

// NOTE upload all image to UploadCare using lodash
// TODO handle delete image
export async function imageProcessing(
  value: any,
  imageAttributeNames: string[]
) {
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

      console.warn(url);
    }
  }
}
