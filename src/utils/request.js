import HttpRequest from "@/utils/axios";
import config from "@/config";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.ADMIN_SERVER
    : config.baseUrl.pro;
// const baseUrl = process.env.NODE_ENV === 'development' ? process.env.API : config.baseUrl.pro
const axios = new HttpRequest(baseUrl);
export default axios;
