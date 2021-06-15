import axios from "axios";
import * as CONSTS from "../utils/consts";

const profileService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/profile`,
});

export function FILL_FORM(body, token) {
  return profileService.post("/profile", body, {
    headers: {
      authorization: token,
    },
  });
}

export function UPDATE_PROFILE(body, token) {
  console.log("BLACKLABEL", body);
  return profileService.put(`/update`, body, {
    headers: {
      authorization: token,
    },
  });
}
