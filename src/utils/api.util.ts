import axios from 'axios';

const APP_BASE_URL = 'https://api.yelp.com/v3/';
const TOKEN =
  'Jw0oIMgpId1HV8x-mogAapr36SVRDSAM00qOEvAmLyxCaOV1I0T6kzJbSvazjA6Q7sNS46uHfHzRzLLAESkHYv3ES50h-sUQwtwvh836OsN-D5UwO6ObMswyxDM6YXYx';

export const api = axios.create({
  baseURL: APP_BASE_URL,
});

api.interceptors.request.use(
  //@ts-ignore
  config => ({
    ...config,
    headers: {
      ...config.headers,
      ...{ Authorization: `Bearer ${TOKEN}` },
    },
  }),
  async error => await Promise.reject(error),
);
