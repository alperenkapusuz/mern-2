export interface Response<T = any> {
    status: number;
    data?: T;
    message: string;
  }
  