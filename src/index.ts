import axios, {
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
  private api: ApiFactory;
  private options: EndpointOptions;
  public custom: {
    [key: string]: <T>(...args: any[]) => Promise<T>;
  } = {};

  constructor(api: ApiFactory, options: EndpointOptions) {
    this.api = api;
    this.options = options;
    this.custom = options.custom || {};
  }

  findAll<T>(params?: any): Promise<T> {
    return this.api.get<T>(this.options.url, { params });
  }

  findOne<T>(id: string): Promise<T> {
    return this.api.get<T>(`${this.options.url}/${id}`);
  }

  create<T>(data: any): Promise<T> {
    return this.api.post<T>(this.options.url, data);
  }

  update<T>(id: string, data: any): Promise<T> {
    return this.api.put<T>(`${this.options.url}/${id}`, data);
  }

  delete<T>(id: string): Promise<T> {
    return this.api.delete<T>(`${this.options.url}/${id}`);
  }

  patch<T>(id: string, data: any): Promise<T> {
    return this.api.patch<T>(`${this.options.url}/${id}`, data);
  }
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

export class ApiFactory implements ApiFactory {
  constructor(options: ApiFactoryOptions) {
    this.instance = axios.create({
      baseURL: options.baseUrl,
      ...options.config,
    });

    if (options.onRequest) {
      this.instance.interceptors.request.use(options.onRequest);
    }

    if (options.onResponse) {
      this.instance.interceptors.response.use(options.onResponse);
    }
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }

  createEndpoint(options: EndpointOptions): Endpoint {
    return new Endpoint(this, options);
  }
}

export default ApiFactory;
