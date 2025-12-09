import axios from "axios";
import { authHeaders, base_url } from "../serverConfig";

export const getCurrentMosaic = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve(axios.get(`${base_url}/getCurrentMosaic`))
        } catch (e) {
            reject(e);
        }
    })
}

export const getCurrentMosaicId = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(axios.get(`${base_url}/getCurrentMosaicId`));
    } catch (e) {
      reject(e);
    }
  });
};

export const getTilesForMosaic = (mosaicId : number) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        axios.get(`${base_url}/getTilesForMosaic/${mosaicId}`)
      );
    } catch (e) {
      reject(e);
    }
  });
};

export const getTilesWithImageForMosaic = (mosaicId: number) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        axios.post(
          `${base_url}/getTilesWithImageForMosaic`,
          { mosaic_id: mosaicId },
          authHeaders
        )
      );
    } catch (e) {
      reject(e);
    }
  });
};