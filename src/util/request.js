import axios from "axios";
import config from "./config";

export const request = (url="", method="", data={}) => {
    // url="role/search";
    return axios({
        url: config.base_url + url,
        method: method, // get , post , put , delete 
        data : data,
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
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