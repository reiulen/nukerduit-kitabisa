import axios from "axios";
import Swal from "sweetalert2";
const baseURL = import.meta.env.VITE_API_URL;

export const apiMock = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

apiMock.interceptors.request.use(function (config) {
  const sessionUser = JSON.parse(localStorage.getItem("sessionUser")!)?.state
    ?.sessionUser;
  const token = sessionUser ? sessionUser?.access_token : null;

  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  return config;
});

apiMock.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response?.data.message) {
      const message = error.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
      if(message == 'Unauthenticated.') {
        localStorage.clear();
        window.location.reload();
      }
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === "string"
                ? error.response.data.message
                : "Erro inesperado",
          },
        },
      });
    }
    return Promise.reject(error);
  }
);

export default apiMock;

type QueryKey = {
  queryKey: [string];
};

export const mockQuery = async ({ queryKey }: QueryKey) => {
  const [url] = queryKey;

  try {
    const { data } = await apiMock.get(url);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

type MutationTypes = {
  data: {
    [key: string]: string | number;
  };
};

export const mockMutation = async (url: string, data: MutationTypes['data']) => {
  try {
    const { data: response } = await apiMock.post(url, data);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
