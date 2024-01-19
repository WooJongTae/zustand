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
    ...initialState,
    userRegister: async (data) => {
      try {
        set((state) => ({ ...state, isLoading: true }));
        console.log(data);
        const response = await axiosInstance.post("/users/register", data);
        console.log(response);
        set((state) => ({
          ...state,
          userData: response.user,
          isLoading: false,
          isAuth: true,
        }));
        toast.info("아이디 생성에 성공했습니다.");
      } catch (error) {
        console.log({ ...initialState, error: error });
        set((state) => ({ ...state, error: error.message }));
        toast.error(error.message);
        // set({ ...initialState, error: error.message });
      }
    },
    userLogin: async (data) => {
      try {
        set((state) => ({ ...state, isLoading: true }));
        console.log(data);
        const response = await axiosInstance.post("/users/login", data);
        console.log(response.data);
        set((state) => ({
          ...state,
          userData: response.data.user,
          isAuth: true,
          isLoading: false,
        }));
        localStorage.setItem("access", response.data.accessToken);
        toast.info("로그인 성공했습니다.");
      } catch (error) {
        console.log({ ...initialState, error: error });
        set((state) => ({ ...state, error: error.message }));
        toast.error(error.message);
        // set({ ...initialState, error: error.message });
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
