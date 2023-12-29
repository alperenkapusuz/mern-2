import { API_URL } from "./env";

export type APIConfigType = {
  baseURL: string | undefined;
};

export const APIConfig: APIConfigType = {
  baseURL: API_URL
};
