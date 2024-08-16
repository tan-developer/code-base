import { AxiosResponse } from "axios";

export const PromiseBeforeInterceptor = <T = any>(promises : Promise<AxiosResponse<T>>) => new Promise((resolve , reject) => {
  promises.then((data) => {
    resolve(data)
  }).catch((error) => {
    reject(error)
  })
});