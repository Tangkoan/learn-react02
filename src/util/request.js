import axios from "axios";
import config from "./config";
import { profileStore } from "../store/profileStore";

export const request = (url="", method="", data={}) => {

    // កូដពេលមាន Login Acess យក Token
    // let {setAccessToken} = profileStore().getState();
    const { access_token } = profileStore.getState();

    // url="role/search";
    return axios({
        url: config.base_url + url,
        method: method, // get , post , put , delete 
        data : data,
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",

            Authorization: "Bearer" + access_token,
            // "Authorization": access_token ? `Bearer ${access_token}` : "",
        }
    }).then(res=>{
        return res.data;
    }).catch(error => {
        console.log(error);

        // ករណី Error (422, 401, 500...)
        // យើងត្រូវ return ទិន្នន័យដែលមកពី Server (res.data)
        if (error.response && error.response.data) {
            return error.response.data; 
        }
        // បើដាច់ Internet ឬ Server ងាប់
        return { status: "error", message: error.message };
        // console.log(error);
    });
}