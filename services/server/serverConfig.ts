export const base_url = "https://mos4ic.com:3000/api/v1/mosaic";
const username = "mosaicFileSystemUser";
const password = "mosaicserver01";


export const authHeaders = {
  auth: {
    username,
    password
  },
};

export const basicAuth =
  "Basic " +
  btoa(
    `${username}:${password}`
  );

  export const getImageURL = (image_path: string) => {
  return `https://mos4ic.com/space/${image_path}`;
};
