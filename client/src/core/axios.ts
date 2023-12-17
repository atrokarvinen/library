import base from "axios";

export const axios = base.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const borrowingAxios = base.create({
  baseURL: "http://localhost:32768",
  withCredentials: true,
});
