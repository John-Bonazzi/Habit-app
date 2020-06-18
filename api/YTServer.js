import axios from 'axios';
import {YT_KEY} from './YTKey';

const YTServer = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/search',
});

YTServer.interceptors.request.use(
  async (config) => {
    config.headers.Accept = 'application/json';
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
)

export const getVideos = async (searchTerm, callback) => {
  const response = await YTServer.get(
    `?key=${YT_KEY}&part=snippet&q=${searchTerm}&maxResults=25&type=video`
  );
  callback(response.data);
}

export default YTServer;