import base from "axios";

export const axios = base.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});
