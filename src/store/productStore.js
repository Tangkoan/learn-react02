
import { create } from "zustand";

import mac_01 from "../assets/images/mac_01.webp";
import mac_02 from "../assets/images/mac_02.webp";
import mac_03 from "../assets/images/mac_03.webp";
import mac_04 from "../assets/images/mac_04.webp";
import mac_05 from "../assets/images/mac_05.jpg";

export const productStore = create((set)=>({
    list: [
        {
            id: 1,
            name: "Mac M1",
            des: "Ram 8BG, SSD:256Gb, 13\" ",
            price: 800,
            image: mac_01
        },

        {
            id: 2,
            name: "Mac M1",
            des: "Ram 8BG, SSD:256Gb, 14\" ",
            price: 1200,
            image: mac_02
        },

        {
            id: 3,
            name: "Mac M1",
            des: "Ram 8BG, SSD:256Gb, 16\" ",
            price: 1400,
            image: mac_01
        },

        {
            id: 4,
            name: "Mac M2",
            des: "Ram 8BG, SSD:256Gb, 13\" ",
            price: 100,
            image: mac_02
        },

        {
            id: 15,
            name: "Mac M2",
            des: "Ram 8BG, SSD:256Gb, 16\" ",
            price: 1600,
            image: mac_03
        },

        {
            id: 6,
            name: "Mac M3",
            des: "Ram 8BG, SSD:256Gb, 13\" ",
            price: 1800,
            image: mac_01
        },

        {
            id: 7,
            name: "Mac M3",
            des: "Ram 8BG, SSD:256Gb, 16\" ",
            price: 2000,
            image: mac_02
        },

        {
            id: 8,
            name: "Mac M4",
            des: "Ram 8BG, SSD:256Gb, 13\" ",
            price: 2400,
            image: mac_03
        },

        {
            id: 9,
            name: "Mac M4",
            des: "Ram 8BG, SSD:256Gb, 16\" ",
            price: 2800,
            image: mac_03
        },
    ]
}))