import { GET, POST } from "../actions";
import axios from "axios";
import { baseURL } from "../../constant";
axios.defaults.baseURL = baseURL;
const token = localStorage.getItem("access-token");

export const LoginFunc = (Url, query) => {
  return POST(Url, query);
};

export const signUp = (params) => {
  return POST("/signup", params);
};

export const logout = () => {
  return POST("/logout");
};

export const getPublishers = () => {
  return GET("/getPublishers");
};

export const getAuthors = () => {
  return GET("/getAuthors");
};

export const addPublisher = (query) => {
  return POST("/addPublisher", query);
};

export const addAuthor = (query) => {
  return POST("/addAuthors", query);
};
export const addBook = (query) => {
  return POST("/addBook", query);
};

export const bookSearch = (parms) => {
  return GET("/search", parms);
};

export const getBookByIdOrTitle = (params) => {
  return GET("/searchBuyIdOrTitle", params);
};

export const addNewOrder = (query) => {
  return POST("/addOrder", query);
};

export const exportData = (config) => {
  return axios.get(
    `/export?search_by_word=${config.params.search_by_word}&type=${config.params.type}&column_filter=${config.params.column_filter}&unit_start=${config.params.unit_start}&unit_end=${config.params.unit_end}&price_start=${config.params.price_start}&price_end=${config.params.price_end}`,
    { Authorization: `bearer ${token}`, responseType: "blob" }
  );
};

export const ordersExPORT = (config) => {
  return axios.get(
    `/Ordersexport?search_by_word=${config.params.search_by_word}&type=${config.params.type}&column_filter=${config.params.column_filter}`,
    { Authorization: `bearer ${token}`, responseType: "blob" }
  );
};

export const orderSearch = (params) => {
  return GET("/searchOrder", params);
};

export const getCountries = () => {
  return GET("https://restcountries.com/v3.1/all");
};
