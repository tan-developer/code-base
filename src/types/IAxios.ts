import { AxiosRequestConfig } from "axios";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  authRequired?: boolean;
  showLoader?: boolean;
}