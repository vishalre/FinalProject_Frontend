import axios from "axios";

const API_URL = process.env.REACT_APP_API_SVR || "http://localhost:4300/api";

const GET_CATALOG_URL = `${API_URL}/catalogs`;

export const GetCatalogs = async () => {
    const data = await axios.get(
      GET_CATALOG_URL,
    );
    return data.data;
  };