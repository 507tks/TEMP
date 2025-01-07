export const env = import.meta.env.VITE_APP_ENV || "dev";

let backendApi;

switch (env) {
  case "dev":
    backendApi = import.meta.env.VITE_API_URL_DEV;
    break;
  case "prod":
    backendApi = import.meta.env.VITE_API_URL_PROD;
    break;
  default:
    backendApi = "http://localhost:8000";
}

export const baseURL = backendApi;
