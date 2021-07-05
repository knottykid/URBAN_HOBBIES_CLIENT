import axios from "axios";
import * as CONSTS from "../utils/consts";

const userService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/users`,
});

export function GET_USERS(body, token) {
  return userService.get("/users", body, {
    authorization: token,
  });
}

export function FOLLOW_USER(body, token) {
  return userService.put("/:userId/follow", body, {
    authorization: token,
  });
}
export function UNFOLLOW_USER(body, token) {
  return userService.put("/:userId/unfollow", body, {
    authorization: token,
  });
}
