import {
    GetCatalogs
  } from "../../../Services/GetCatalogs";

export const getCatalogsAction = async () => {
    const info = await GetCatalogs();
    return info;
  };