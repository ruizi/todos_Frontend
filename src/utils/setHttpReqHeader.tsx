import axios from "axios";

export const setHttpReqHeaderWithToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
}

export const sendDateAxisConfig = () => {
    return {
        //define the http post config
        headers: {
            "Content-Type": "application/json",
        },
    }
}
