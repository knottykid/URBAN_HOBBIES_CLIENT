import axios from "axios";
import * as CONSTS from "../utils/consts";

const hobbyService = axios.create({
  baseURL: `${CONSTS.SERVER_URL}/hobbies`,
});

export function GET_HOBBIES(body, token) {
  return hobbyService.get("/hobbies", body, {
    headers: { authorization: token },
  });
}
export function ADD_HOBBY(body, token) {
  return hobbyService.post("/add", body, {
    headers: {
      authorization: token,
    },
  });
}
