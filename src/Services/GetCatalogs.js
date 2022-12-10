import axios from "axios";

const API_URL = process.env.REACT_APP_API_SVR || "http://localhost:4300/api";

const GET_CATALOG_URL = `${API_URL}/catalogs`;
const ADD_CATALOG_URL = `${API_URL}/catalogs/create`
export const GetCatalogs = async () => {
    const data = await axios.get(
      GET_CATALOG_URL,
    );
    return data.data;
  };

  export const addCatalog = async (name) => {
    const loginInfo = JSON.parse(localStorage.getItem("LoggedIn"));
    console.log(name);
    const data = await axios.post(
      ADD_CATALOG_URL,
      {
        id: loginInfo._id,
        catalogName:name
      },
      {
        headers: {
          authorization: localStorage.getItem("LoginToken"),
        },
      }
    );
    return data.data;
  };