import axios, { AxiosResponse } from 'axios';

export abstract class BaseApiService {
  protected static baseUrl: string;

  static getFullUrl(subpath: string): string {
    return `${process.env.REACT_APP_API_URL}/${this.baseUrl}/${subpath}`;
  }

  static get<T>(subpath: string, params?: Object): Promise<AxiosResponse<T>> {
    return axios.get<T>(this.getFullUrl(subpath), { params, withCredentials: true });
  }

  static post<T>(subpath: string, body?: any): Promise<AxiosResponse<T>> {
    return axios.post<T>(this.getFullUrl(subpath), body, { withCredentials: true });
  }

  static delete<T>(subpath: string, params?: Object): Promise<AxiosResponse<T>> {
    return axios.delete<T>(this.getFullUrl(subpath), { params, withCredentials: true });
  }

  static put<T>(subpath: string, body?: any): Promise<AxiosResponse<T>> {
    return axios.put<T>(this.getFullUrl(subpath), body, { withCredentials: true });
  }
}
