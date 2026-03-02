import { BiCategory } from "react-icons/bi";
import { create } from "zustand";

export const countStore = create((set)=> ({
    count: 10,
    Category: [
        {
            id: 1,
            name: "Mac M1",
            des: "Ram 8BG, SSD:256Gb, 13\" ",
            price: 800,
            image: mac_01,
            wislist:0,
        }
    ],

    loading: false,

    increase: () => set((pre)=> ({ count: pre.count + 1})),
    descrease: () => set((pre)=> ({ count: pre.count - 1})),
    reset: () => set({ count: 0, Category:[]}),
    update : (value) => set({ count: value}),
}))