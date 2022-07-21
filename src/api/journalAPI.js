import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://journal-vue-a43ad-default-rtdb.firebaseio.com",
});

journalApi.interceptors.request.use((config) => {
  config.params = {
    auth: localStorage.getItem("token"),
  };

  return config;
});

export default journalApi;
