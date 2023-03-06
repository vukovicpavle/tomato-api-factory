import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface EndpointOptions {
  url: string;
  custom?: {
    [key: string]: (...args: any[]) => Promise<any>;
  };
}

export interface Endpoint {
  findAll<T>(params?: any): Promise<T>;
  findOne<T>(id: string): Promise<T>;
  create<T>(data: any): Promise<T>;
  update<T>(id: string, data: any): Promise<T>;
  delete<T>(id: string): Promise<T>;
  patch<T>(id: string, data: any): Promise<T>;
  custom: {
    [key: string]: <T>(...args: any[]) => Promise<T>;
  };
}

export class Endpoint {
  constructor(api: ApiFactory, options: EndpointOptions);
  findAll<T>(params?: any): Promise<T>;
  findOne<T>(id: string): Promise<T>;
  create<T>(data: any): Promise<T>;
  update<T>(id: string, data: any): Promise<T>;
  delete<T>(id: string): Promise<T>;
  patch<T>(id: string, data: any): Promise<T>;
  custom: {
    [key: string]: <T>(...args: any[]) => Promise<T>;
  };
}

export interface ApiFactoryOptions {
  baseUrl: string;
  config?: AxiosRequestConfig;
  onRequest?: (
    value: InternalAxiosRequestConfig<any>
  ) =>
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>>;
  onResponse?: (response: AxiosResponse) => AxiosResponse;
}

export interface ApiFactory {
  instance: AxiosInstance;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}
