import { uploadDirect } from "@uploadcare/upload-client";

import {
  deleteFile,
  UploadcareSimpleAuthSchema,
} from "@uploadcare/rest-client";

export const uploadImage = async (file: File | Blob): Promise<string> => {
  try {
    const result = await uploadDirect(file, {
      publicKey: process.env.NEXT_PUBLIC_UPLOADCARE ?? "",
      store: "auto",
    });
    return result.cdnUrl ?? "";
  } catch (error) {
    console.error(error);
    return "";
  }
};
export const removeImage = async (url: string) => {
  const uploadcareSimpleAuthSchema = new UploadcareSimpleAuthSchema({
    publicKey: process.env.NEXT_PUBLIC_UPLOADCARE ?? "",
    secretKey: "YOUR_SECRET_KEY",
  });

  const matches = url.match(/https:\/\/ucarecdn\.com\/(.*?)(\/|$)/);
  return await deleteFile(
    {
      uuid: matches?.[1] ?? "",
    },
    { authSchema: uploadcareSimpleAuthSchema }
  );
};
