import axios from "axios";

const API_URL = process.env.REACT_APP_API_SVR || "http://localhost:4300/api";
let GET_USER_PUBLIC_DETAILS_URL = `${API_URL}/users/`;
export const GetUserPublicInformation = async (id) => {
  const data = await axios.get(`${GET_USER_PUBLIC_DETAILS_URL}${id}`);
  return data.data.user;
};
