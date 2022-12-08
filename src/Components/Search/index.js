import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { getProductsByNameAction } from "../Actions/AddProduct";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [dbproducts, setDbproducts] = useState([]);
  const [searchText, setSearchText] = useState();
  const { productName } = useParams();
  const Navigate = useNavigate();
  const productRef = useRef();
  var searchString = "";

  const searchProductsByName = async () => {
    if (productRef.current.value !== "") {
      await getProductsByNameAction(productRef.current.value).then((data) => {
        setDbproducts(data);
      });
    } else if (productName !== undefined) {
      await getProductsByNameAction(productName).then((data) => {
        setDbproducts(data);
      });
    }
  };

  const searchProducts = () => {
    searchProductsByName();

    if (productRef.current.value !== null && productRef.current.value !== "") {
      searchString = productRef.current.value;
    } else if (productName !== undefined) {
      searchString = productName;
      setSearchText(productName);
    }
    if (searchString !== "") {
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
            "7c3530cf95msh4a42849e06f7945p146398jsne990820a2f14",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setProducts(response.data.docs);
        })
        .catch(function (error) {});
    }
    Navigate(`/search/${searchString}`);
  };

  useEffect(() => {
    searchProducts();
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
                className=" btn btn-primary rounded float-end"
                onClick={() => searchProducts()}
                style={{backgroundColor: "#222f3e",
                  color: "#fff", borderColor:"#222f3e"}}
              >
                Search
              </button>
            </div>
          </div>
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
                <strong>From the DB</strong>
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div className="accordion-body">
                <ul className="list-group">
                  {dbproducts.map((prod) => (
                    <li
                      className="list-group-item"
                      style={{ backgroundColor: "rgba(137, 215, 245, 0.83)" }}
                      key={"l" + prod._id}
                    >
                      <Link to={`/details_db/${prod._id}`}>
                        <div className="row">
                          <div className="col-2">
                            <img
                              src={prod.imageUrl}
                              className="me-3"
                              height={60}
                              alt="Product"
                            />
                            {/*Heading*/}
                          </div>
                          <div className="col-9">{prod.name}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
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
                <strong>From 3rd Party Api</strong>
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              className="accordion-collapse collapse"
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
                      <Link to={`/details/${product.product_id}`}>
                        <div className="row">
                          <div className="col-2">
                            <img
                              src={product.product_main_image_url}
                              className="me-3"
                              height={60}
                              alt="Product"
                            />
                          </div>
                          <div className="col-9">{product.product_title}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
