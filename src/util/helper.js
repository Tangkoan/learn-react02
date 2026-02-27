import dayjs from "dayjs";

export const dateClient = (date) => {
    if(date){
        return dayjs(date).format("DD-MM/YYYY h:m a")
    }
    
    // បើអត់មាន Return Null
    return null; 
};