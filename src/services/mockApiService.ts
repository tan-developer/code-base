import AppPath from "@/constant/AppPath";
import { get } from "@/utils/axios";
import { AxiosResponse } from "axios";

export default class MockApiService {
  async getMockDataGet<T>(data: any): Promise<AxiosResponse<T>> {
    return get<T>(AppPath.MOCK_API, {
      params: data,
      authRequired: true,
    });
  }
}
