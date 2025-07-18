import axios from "axios";

const instance = axios.create({
  baseURL: "https://leaderboard-assignment-crgm.onrender.com"  , // your backend port
});

export default instance;
