import Axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://47.99.146.10:80"
    : "http://localhost:8080";

const http = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

export default http;
