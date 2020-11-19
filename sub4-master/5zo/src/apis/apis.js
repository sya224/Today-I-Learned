import axios from "axios";

export default axios.create({
  // baseURL: "https://i02a101.p.ssafy.io:8443/spring/api",
  baseURL: "http://13.124.67.187:8080/spring/api",
  headers: {
    // "Access-Control-Allow-Origin": "*"
  }
});
