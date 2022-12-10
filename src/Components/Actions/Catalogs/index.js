import {
    GetCatalogs, addCatalog
  } from "../../../Services/GetCatalogs";

export const getCatalogsAction = async () => {
    const info = await GetCatalogs();
    return info;
  };

export const addCatalogsAction = async (catalogName) => {
  const info = await addCatalog(catalogName);
  return info;
}