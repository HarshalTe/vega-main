import axios from "axios";
import { baseUrl } from "./shared/baseUrl";

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
