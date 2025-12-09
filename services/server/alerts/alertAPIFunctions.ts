import axios from "axios";
import { base_url } from "../serverConfig";

export const getAlertsForUser = (body: {user_id: number}) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(axios.post(`${base_url}/getRecentNotificationsForUser`, body));
    } catch (e) {
      reject(e);
    }
  });
}; 

export const notificationViewed = (notification_id: number) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(axios.post(`${base_url}/notificationViewed`, {notification_id: notification_id}))
    } catch (e) {
      reject(e);
    }
  })
}