import axios from "axios";
import { create } from "zustand";

export const useNotification = create((set) => ({
  notification: 0,
  fetch: async () => {
    const res = await axios.get(
      "http://localhost:3000/api/users/notifications",
      { withCredentials: true }
    );
    set({ notification: res.data });
  },
  decrease: () => {
    set((state) => ({ notification: state.notification - 1 }));
  },
  reset: () => {
    set({ notification: 0 });
  },
}));
