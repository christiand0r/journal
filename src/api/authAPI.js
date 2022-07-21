import axios from "axios";

const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: {
    key: "AIzaSyC-n7tj3a_hNMKS_yxg5IkL6e2KySBE5XA",
  },
});

export default authApi;
