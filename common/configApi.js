import cookies from "next-cookies";

const configApi = (token = document.cookie) => {
    return {headers:{
            Authorization: `Bearer ${cookies(token).jwt}`
        }}
};

export default  configApi;