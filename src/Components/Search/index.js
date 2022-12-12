import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { getProductsByNameAction } from "../Actions/AddProduct";
import { getCatalogsAction } from "../Actions/Catalogs";
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import {AddToCart} from "../../Services/CartService";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [dbproducts, setDbproducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const [searchText, setSearchText] = useState();
  const { productName } = useParams();
  const Navigate = useNavigate();
  const productRef = useRef();
  var searchString = "";

  // const searchProductsByName = async () => {
  //   if (productRef.current.value !== "") {
  //     await getProductsByNameAction(productRef.current.value).then((data) => {
  //       setDbproducts(data);
  //       setLoading(false);
  //     });
  //   } else if (productName !== undefined) {
  //     await getProductsByNameAction(productName).then((data) => {
  //       setDbproducts(data);
  //       setLoading(false);
  //     });
  //   }
  // };

  const fetchAllCatalogs = async () => {
    getCatalogsAction().then((data) => setCatalogs(data));
  };

  const addToCart = (product) => {
    const loginInfo = JSON.parse(localStorage.getItem("LoggedIn"));
    const p = {
      product: product.product_id,
      productimg: product.product_main_image_url,
      unitPrice: product.app_sale_price,
      quantity: 1,
      user: loginInfo._id
    };

    AddToCart(p);

  };

  const searchProductsByCategory = (catalogName) => {
    console.log(catalogName)
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://amazon24.p.rapidapi.com/api/product",
      params: {
        categoryID: "aps",
        keyword: catalogName,
        country: "US",
        page: "1",
      },
      headers: {
        "X-RapidAPI-Host": "amazon24.p.rapidapi.com",
        "X-RapidAPI-Key":
          "1d237264a5mshef4b2877fab48afp163d32jsn7d458fbb81e7",
      },
    };
    axios
        .request(options)
        .then(function (response) {
          setProducts(response.data.docs);
          setLoading(false);
        })
        .catch(function (error) {});
        Navigate(`/search/${catalogName}`);
  }

  const searchProducts = () => {
    // searchProductsByName();

    if (productRef.current.value !== null && productRef.current.value !== "") {
      searchString = productRef.current.value;
    } else if (productName !== undefined) {
      searchString = productName;
      setSearchText(productName);
    }
    if(searchString!== "" && catalogs.indexOf(searchString)>=0){
        searchProductsByCategory(searchString);
    }
    if (searchString !== "") {
      setLoading(true);
      const options = {
        method: "GET",
        url: "https://amazon24.p.rapidapi.com/api/product",
        params: {
          categoryID: "aps",
          keyword: { searchString },
          country: "US",
          page: "1",
        },
        headers: {
          "X-RapidAPI-Host": "amazon24.p.rapidapi.com",
          "X-RapidAPI-Key":
            "1d237264a5mshef4b2877fab48afp163d32jsn7d458fbb81e7",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setProducts(response.data.docs);
          setLoading(false);
        })
        .catch(function (error) {});
    }
    Navigate(`/search/${searchString}`);
  };

  useEffect(() => {
    searchProducts();
    fetchAllCatalogs();
    /* eslint-disable-next-line */
  }, []);

  return (
    <div className="row wd-bg-image">
      <div className="mt-3 mb-3">
        <div className="mt-1 mb-3 input-icons">
          <div className="row">
            <div className="col col-10">
              <i className="fas fa-search wd-icon-pos"></i>

              <input
                ref={productRef}
                className="form-control ms-3 ps-5 rounded-pill w-100 d-inline"
                id="text-fields-search"
                placeholder="Search Product"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="col col-2">
              <button
                className=" btn btn-primary rounded"
                onClick={() => searchProducts()}
                style={{backgroundColor: "#222f3e",
                  color: "#fff", borderColor:"#222f3e"}}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
              <button
                className="accordion-button wd-my-list-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
                style={{backgroundColor: "#222f3e",
                  color: "#fff"}}
              >
                <strong>Search by Catalog</strong>
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div className="accordion-body">
                {/* {catalogs.length > 0 ? (
                  <>
                  <ul className="list-group">
                    { catalogs.map((cat) => {
                      console.log(cat.catalogName);
                      <li className="list-group-item">{cat.catalogName}</li>
                    })}
                    </ul>
                  </>
                  )
                  : <></> 
                   } */}
                  {catalogs.map((cat) => (
                    <li
                      className="category-list"
                      key={"l" + cat._id}
                    >
                    <Button variant="primary" onClick = { ()=> searchProductsByCategory(cat.catalogName)}>{cat.catalogName}</Button>
                    </li>
                  ))}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
              <button
                className="accordion-button collapsed rounded"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
                style={{backgroundColor: "#222f3e",
                  color: "#fff"}}
              >
                <strong>List of Products:</strong>
              </button>
            </h2>
            {loading ? (
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse"
              aria-labelledby="panelsStayOpen-headingTwo"
            >
              <div className="accordion-body">
                <div className="d-flex flex-column align-items-center bg-white justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              </div>
            </div>
            ):(
              <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse"
              aria-labelledby="panelsStayOpen-headingTwo"
            >
              <div className="accordion-body">
                <ul className="list-group">
                  {products.map((product) => (
                    <li
                      className="list-group-item"
                      style={{ backgroundColor: "rgba(137, 215, 245, 0.83)" }}
                      key={"l" + product.product_id}
                    >
                      <div className="row">
                      <div className="col-2">
                        <img
                          src={product.product_main_image_url}
                          className="me-3"
                          height={60}
                          alt="Product"
                          />
                      </div>
                      <div className="col-8">
                      <Link to={`/details/${product.product_id}`}
                            state={{productState: product }}>>
                      {product.product_title}
                      </Link>
                      </div>
                      <div className="col-2">
                      <button className=" btn btn-primary rounded"
                                    style={{backgroundColor: "#222f3e",
                                      color: "#fff", borderColor:"#222f3e"}}
                                    onClick ={()=> addToCart(product)}>Add to cart
                      </button>
                      </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
