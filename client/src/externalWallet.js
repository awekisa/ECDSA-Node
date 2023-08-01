import axios from "axios";

const externalWallet = axios.create({
  baseURL: "http://localhost:3000",
});

export default externalWallet;
