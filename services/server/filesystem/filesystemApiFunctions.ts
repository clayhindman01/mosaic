import { basicAuth, base_url } from "../serverConfig";
import * as FileSystem from "expo-file-system/legacy";
import { FileSystemUploadType } from "expo-file-system/legacy";

export const uploadImage = async (photo: {uri: string}) => {
  console.log(photo.uri);
  await FileSystem.uploadAsync(`${base_url}/upload`, photo.uri, {
    httpMethod: "POST",
    uploadType: FileSystemUploadType.MULTIPART,
    fieldName: "image",
    headers: { Authorization: basicAuth },
  })
    .then(async (res) => {
      console.log("Uploaded Image", res.body);
    })
    .catch((e) => {
      console.error("Exception in uploadImage", e);
    });
};