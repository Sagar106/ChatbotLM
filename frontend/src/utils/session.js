import { v4 as uuidv4 } from "uuid";

export const getSessionId = () => {
  let id = sessionStorage.getItem("sessionId");

  if (!id) {
    id = uuidv4();
    sessionStorage.setItem("sessionId", id);
  }

  return id;
}