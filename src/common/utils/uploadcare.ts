import { removeImage, uploadImage } from "@/services";
var lodashGet = require("lodash.get");
var lodashSet = require("lodash.set");

// for nested value, use this syntax:
// example: imageAttributeNames = ['image', ['auraInfos','image'], background]
// inspired by antd nested value form name

export async function uploadImages(
  value: any,
  imageAttributeNames: (string | string[])[],
  originalValue: any = null
) {
  for (const attribute of imageAttributeNames) {
    let paths: string[] = [];
    if (Array.isArray(attribute)) {
      const item = lodashGet(value, attribute[0]);
      item?.forEach((_: any, i: number) =>
        paths.push(attribute[0] + "[" + i + "]." + attribute[1])
      );
    } else paths.push(attribute);

    for (const path of paths) {
      // check if update image, then delete image on uploadCare
      if (originalValue) {
        const item = lodashGet(value, path);
        const originalItem = lodashGet(originalValue, path);
        if (originalItem && originalItem != item)
          await removeImage(originalItem);
      }

      const item = lodashGet(value, path);
      if (!item || !item.startsWith("blob")) continue;

      const file = await fetch(item).then((r) => r.blob());
      const url = await uploadImage(file);

      lodashSet(value, path, url);
      URL.revokeObjectURL(item);
    }
  }
}

export async function removeImages(
  value: any,
  imageAttributeNames: (string | string[])[]
) {
  for (const attribute of imageAttributeNames) {
    let paths: string[] = [];
    if (Array.isArray(attribute)) {
      const item = lodashGet(value, attribute[0]);
      item?.forEach((_: any, i: number) =>
        paths.push(attribute[0] + "[" + i + "]." + attribute[1])
      );
    } else paths.push(attribute);
    for (const path of paths) {
      const item = lodashGet(value, path);
      if (item) await removeImage(item);
    }
  }
}
