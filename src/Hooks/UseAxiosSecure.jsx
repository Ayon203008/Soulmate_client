import axios from 'axios';
import React from 'react';


const axiosScure = axios.create({
    baseURL:'https://last-try-six-kappa.vercel.app'
})


const UseAxiosSecure = () => {
    return axiosScure;
};

export default UseAxiosSecure;