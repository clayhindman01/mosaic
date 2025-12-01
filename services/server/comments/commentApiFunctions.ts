import axios from "axios";
import { base_url } from "../serverConfig";

export type CreateTileComment = {
    user_id: number | undefined,
    tile_id: number,
    comment_desc: string,
}

export type CreateCollectiveComment = {
    user_id: number | undefined,
    collective_id: number,
    comment_desc: string,
}

export const createTileComment = (body: CreateTileComment) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(axios.post(`${base_url}/createComment`, body));
    } catch (e) {
      reject(e);
    }
  });
};


export const createCollectiveComment = (body: CreateCollectiveComment                                     ) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        axios.post(`${base_url}/createCollectiveComment`, body)
      );
    } catch (e) {
      reject(e);
    }
  });
};

export const getCommentsForTile = (body: {tile_id: number}) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(axios.post(`${base_url}/getCommentsForTile`, body));
    } catch (e) {
      reject(e);
    }
  });
};

export const getCommentsForCollective = (body: {collective_id: number}) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        axios.post(`${base_url}/getCommentsForCollective`, body)
      );
    } catch (e) {
      reject(e);
    }
  });
}