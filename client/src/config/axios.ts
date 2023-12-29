// GELEN GUNCELLEMELER İLE DEGİSİKLİK GÖSTEREBİLİR
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { API_URL } from "./env";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  "Content-Type": "application/json",
  'Accept-Language': 'tr',
};

const injectToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    try {
      const token = Cookies.get("authToken");
      if (token != undefined && token != null) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;

    } catch (error: any) {
      throw new Error(error);
    }
  };
  

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {

    const http = axios.create({
      baseURL: API_URL,
      headers,
      timeout: 1000 * 20,
    });

    http.interceptors.request.use(injectToken, (error) => Promise.reject(error));

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );

    this.instance = http;
    return http;
  }

  GET<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {return this.http.get<T, R>(url, config)}

  POST<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {return this.http.post<T, R>(url, data, config)}

  PUT<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {return this.http.put<T, R>(url, data, config)}

  DELETE<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {return this.http.delete<T, R>(url, config)}

  private handleError(error: AxiosError) {    
    switch (error.status) { 
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
    }

    return Promise.reject(error);
  }
}


export const http = new Http();