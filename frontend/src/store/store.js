import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: "",
    image: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
};

const useStore = create(
  // persist(
  devtools((set) => ({
    initialState,
    userRegister: async (data) => {
      try {
        set((state) => ({ ...state, isLoading: true }));
        const response = await axiosInstance.post("/users/register", data);
        console.log(response);
        set((state) => ({
          ...state,
          initialState: {
            userData: response.user,
            isLoading: false,
            isAuth: true,
          },
        }));
        toast.info("아이디 생성에 성공했습니다.");
      } catch (error) {
        console.log({ ...initialState, error: error });
        set((state) => ({
          initialState: { ...state.initialState, error: error.message },
        }));
        toast.error(error.message);
        // set({ ...initialState, error: error.message });
      }
    },
    userLogin: async (data) => {
      try {
        // set((state) => ({ ...state, initialState: { isLoading: true } }));
        set((state) => ({
          initialState: { ...state.initialState, isLoading: true },
        }));
        const response = await axiosInstance.post("/users/login", data);
        set((state) => ({
          ...state,
          initialState: {
            userData: response.data.user,
            isAuth: true,
            isLoading: false,
            error: "",
          },
        }));
        localStorage.setItem("access", response.data.accessToken);
        toast.info("로그인 성공했습니다.");
      } catch (error) {
        console.log({ ...initialState, error: error });
        set((state) => ({
          initialState: { ...state.initialState, error: error.message },
        }));
        toast.error(error.message);
        // set({ ...initialState, error: error.message });
      }
    },
    userAuth: async () => {
      try {
        set((state) => ({
          initialState: { ...state.initialState, isLoading: true },
        }));
        const response = await axiosInstance.get("/users/auth");
        console.log(response);
        set((state) => ({
          ...state,
          initialState: {
            userData: response.data,
            isAuth: true,
            isLoading: false,
            error: "",
          },
        }));
      } catch (error) {
        console.log(error);
      }
    },
    userLogout: async () => {
      try {
        const response = await axiosInstance.post("/users/logout");
        console.log(response);
        set(() => ({
          initialState,
        }));
        localStorage.removeItem("access");
      } catch (error) {
        console.log(error);
      }
    },
  })),
  {
    name: "userStore",
    // , storage: createJSONStorage(() => sessionStorage)
  }
  // )
);

export default useStore;
