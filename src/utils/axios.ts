import AuthenticateService from "@/auth/AuthenticateService";
import { env } from "@/config/env";
import { CustomAxiosRequestConfig } from "@/types/IAxios";
import Axios, {AxiosError,AxiosResponse,} from "axios";


const defaultConfig : CustomAxiosRequestConfig = {
  showLoader: true,
  authRequired: true,
}

const customRequest = <T = any>(
  config: CustomAxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return api.request<T>(config);
};

const api = Axios.create({
  baseURL: env.API_URL,
});

const requestInterceptor =  (config: CustomAxiosRequestConfig) => {
  if (config.authRequired) {
    const token = AuthenticateService.authHeaer();
    if (config && config.headers) {
      config.headers.Authorization = `${token} This is fake token`;
    }
  }

  return config
};


// @ts-ignore
// Idk why this is not working
api.interceptors.request.use(requestInterceptor);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    
    return error;
  }
);

export const get = <T = any>(
  url: string,
  config: CustomAxiosRequestConfig = defaultConfig
): Promise<AxiosResponse<T>> => {
  return customRequest<T>({ ...config, url, method: "GET" });
};

export const post = <T = any>(
  url: string,
  data?: any,
  config: CustomAxiosRequestConfig = defaultConfig
): Promise<AxiosResponse<T>> => {
  return customRequest<T>({ ...config, url, method: "POST" , data });
}



