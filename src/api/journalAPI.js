import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://journal-vue-a43ad-default-rtdb.firebaseio.com",
});

export default journalApi;
