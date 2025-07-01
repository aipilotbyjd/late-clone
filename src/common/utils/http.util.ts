import axios, { AxiosRequestConfig } from 'axios';

export class HttpUtil {
  static async request<T = any>(config: AxiosRequestConfig): Promise<T> {
    const response = await axios.request<T>(config);
    return response.data;
  }

  static async get<T = any>(
    url: string,
    headers: Record<string, any> = {},
  ): Promise<T> {
    return this.request({ method: 'GET', url, headers });
  }

  static async post<T = any>(
    url: string,
    data: any,
    headers: Record<string, any> = {},
  ): Promise<T> {
    return this.request({ method: 'POST', url, data, headers });
  }
}
