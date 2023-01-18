import axios, { AxiosInstance } from 'axios';
import { IHttpClient } from 'commons/types/module.types';

export default class HttpClient implements IHttpClient {
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
    });
  }

  get(endPoint: string, options?: any) {
    return this.client.get(endPoint, {
      ...options,
    });
  }

  post(endPoint: string, payload: any, options?: any) {
    return this.client.post(endPoint, payload, {
      ...options,
    });
  }

  put(endPoint: string, payload: any, options?: any) {
    return this.client.put(endPoint, payload, {
      ...options,
    });
  }

  delete(endPoint: string, options?: any) {
    return this.client.delete(endPoint, {
      ...options,
    });
  }
}
