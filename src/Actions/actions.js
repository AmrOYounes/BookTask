import axios from "axios";
import {baseURL} from '../constant';
const token = localStorage.getItem('access-token');
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common = {Authorization: `Bearer ${token}`};

export const GET = (API, params) => axios.get(API, {params})
                                  .then( res => res.data);

export const POST = (API, Q,) => axios.post(API, Q)
                              .then(res => res.data);

                                       