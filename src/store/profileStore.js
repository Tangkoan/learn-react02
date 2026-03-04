import { BiCategory } from "react-icons/bi";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

// export const profileStore = create((set)=> ({
//     // profile: {
//     //     id: null,
//     //     image: "",
//     //     name: "Tangkoan",
//     //     email: "kuytangkoan@gmail.com",
//     //     role: "Super Admin",
//     //     permission : null,
//     // }, // state

//     // profile: {
//     //     id: null,
//     //     image: "",
//     //     name: "",
//     //     email: "",
//     //     role: "",
//     //     permission : null,
//     // }, // state
//     profile: null, 
//     access_token: null,
   
//     setProfile: (data) => set({ profile: data }),
//     setAccessToken: (params) => set({ access_token: params }),


//     // មុខងារ Logout
//     logout: () => set(() => ({ 
//         profile: null, 
//         access_token: null 
//     })),

//     // setProfile: (data) => set((pre)=> ({ profile: {...pre.profile, ...data}})),
//     // setAccessToken: (params)=> set((pre)=> ({access_token: params})),
//     // logout: (data) => set((pre)=> ({ profile: null })),
// }))



export const profileStore = create()(
  persist(
    (set, get) => ({
        profile: null, 
        access_token: null,

        setProfile: (data) => set({ profile: data }),
        setAccessToken: (params) => set({ access_token: params }),
        // មុខងារ Logout
        logout: () => set(() => ({ profile: null, access_token: null })),
        
    }),
    {
      name: 'profile', // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      storage: createJSONStorage(() => localStorage), // 👈 ប្ដូរទីនេះ
    },
  ),
)