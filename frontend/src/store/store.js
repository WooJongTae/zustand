import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axiosInstance from "../utils/axios";

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
  persist(
    devtools((set) => ({
      ...initialState,
      userRegister: async (data) => {
        try {
          console.log(data);
          const response = await axiosInstance.post("/users/register", data);
          console.log(response);
        } catch (error) {
          console.log({ ...initialState, error: error });
          set((state) => ({ ...state.userData, error: error.message }));
          // set({ ...initialState, error: error.message });
        }
      },
    })),
    { name: "userStore" }
  )
);

export default useStore;
