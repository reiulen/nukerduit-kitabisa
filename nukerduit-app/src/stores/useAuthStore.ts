import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios, { AxiosError } from "axios";
import apiMock from "@/utils/libs/axios-mock";

type SessionUser = {
  token: string;
  token_type: string;
  access_token: string;
  expires_in: number;
  logged_in_at: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
};

type SessionUserState = {
  sessionUser: SessionUser;
  setSessionUser: (sessionUser: SessionUser) => void;
};

type CredentialsTypes = {
  username: string;
  password: string;
};

const initialUserData = {
  token: "",
  token_type: "",
  expires_in: 0,
  access_token: "",
  logged_in_at: "",
  user: {
    id: "",
    name: "",
    username: "",
  },
};

type AuthUserState = {
  process: {
    status: "idle" | "loading" | "success" | "error";
    type: string;
    message?: string;
    data?: SessionUser;
  };
  signIn: (credentials: CredentialsTypes) => Promise<void>;
  logOut: () => void;
};

export const useAuthStore = create<AuthUserState>((set) => ({
  process: {
    status: "idle",
    type: "",
    message: "",
    data: { ...initialUserData },
  },
  signIn: async (credentials: CredentialsTypes) => {
    try {
      set({ process: { status: "loading", type: "login" } });
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        credentials
      );

      const status = data?.data?.access_token ? "success" : "error";

      set({
        process: {
          status,
          type: "login",
          data: data.data || { ...initialUserData },
          message: status === "error" ? data.message : "",
        },
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        process: {
          status: "error",
          type: "login",
          data: { ...initialUserData },
          message: err.response?.data?.message || "Something went wrong",
        },
      });
    }
  },
  logOut: async () => {
    try {
      set({ process: { status: "loading", type: "logout" } });
      const { data } = await apiMock.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {},
      );

      const status = data?.status;
      if (status) {
        localStorage.removeItem("sessionUser");
        localStorage.clear();
        set({
          process: { status: "success", type: "logout", data: initialUserData },
        });
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        process: {
          status: "error",
          type: "logout",
          data: { ...initialUserData },
          message: err.response?.data?.message || "Something went wrong",
        },
      });
    }
  },
}));

export const useSessionAuth = create<SessionUserState>()(
  persist(
    (set) => ({
      sessionUser: { ...initialUserData },
      setSessionUser: (sessionUser) => set({ sessionUser }),
    }),
    { name: "sessionUser" }
  )
);
