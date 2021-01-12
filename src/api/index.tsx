import axios from "axios";

const serviceClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default serviceClient;
