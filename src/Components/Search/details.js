import React, { useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { isDealerService } from "../../Services/LoginService";
import { AddProductAction } from "../Actions/AddProduct";
import "./index.css";

const Details = () => {
  const [productTitle, setproductTitle] = useState([]);
  const [product, setProduct] = useState([]);
  const [priceInfo, setPriceInfo] = useState([]);
  const [productAllDetails, setProductAllDetails] = useState([]);
  const [data, setData] = useState({
    name: "",
    imageUrl: "",
    price: 0,
    manufacturer: "",
    asin: "",
    country: "",
    originalPrice: 0,
    discount: 0,
    discountPercentage: 0,
    currency: "",
    vid: "",
  });
  const { product_id } = useParams();
  const login = useSelector((state) => state.LogIn);

  const addToCart = () => {
    AddProductAction(data);
  };
  const productDetails = () => {
    const options = {
      method: "GET",
      url: `https://amazon24.p.rapidapi.com/api/product/${product_id}`,
      params: { country: "US" },
      headers: {
        "X-RapidAPI-Host": "amazon24.p.rapidapi.com",
        "X-RapidAPI-Key": "7c3530cf95msh4a42849e06f7945p146398jsne990820a2f14",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setproductTitle(response.data.product_title);
        setProduct(response.data.product_details);
        setPriceInfo(response.data.price_information);
        setProductAllDetails(response.data);
        setData({
          ...data,
          name: response.data.product_title,
          asin: product_id,
          imageUrl: response.data.product_main_image_url,
          manufacturer: response.data.product_details["_Manufacturer_"],
          originalPrice: Number(
            response.data.price_information["original_price"]
          ),
          price: Number(response.data.price_information["app_sale_price"]),
          currency: response.data.price_information["currency"],
          discount: Number(response.data.price_information["discount"])
            ? -1 * Number(response.data.price_information["discount"])
            : Number(response.data.price_information["discount"]),
          discountPercentage: Number(
            response.data.price_information["discount_percentage"]
          ),
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    productDetails();

    /* eslint-disable-next-line */
  }, []);

  return (
    <div>
      <br></br>
      <div>
        <h1>{productTitle}</h1>

        <div className="row">
          <div className="col">
            {login.logedIn && isDealerService() && (
              <button
                className="col-2 btn-primary float-end rounded"
                onClick={() => {
                  addToCart();
                }}
              >
                Add Product
              </button>
            )}
          </div>
        </div>

        <div className="my-3 mx-auto" style={{ textAlign: "center" }}>
          <img
            src={productAllDetails.product_main_image_url}
            height={300}
            alt="All product Details"
          />
        </div>

        <ul className="list-group mt-5">
          {Object.keys(product).map((prod) => (
            <li className="list-group-item">
              <div className="row">
                <div className="col-md-4 ">
                  <span>
                    <b>{prod.replaceAll("_", " ").trim()}</b>
                  </span>{" "}
                  :
                </div>
                <div className="col-md-8 ">
                  <span>{product[prod]}</span>
                </div>
              </div>
            </li>
          ))}
          {Object.keys(priceInfo).map((prod) => (
            <li className="list-group-item">
              <div className="row">
                <div className="col-md-4">
                  <span>
                    <b>{prod.replaceAll("_", " ").trim()}</b>
                  </span>{" "}
                  :
                </div>
                <div className="col-md-8">
                  <span>{priceInfo[prod]}</span>
                </div>
              </div>
            </li>
          ))}
          {/* <li className="list-group-item">
            <div className="row">
              <div className="col-md-4">
                <span>
                  <b>Trusted User Rating</b>
                </span>{" "}
                :
              </div>
              <div className="col-md-8">
                <span>
                  <StarRating />
                </span>
              </div>
            </div>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Details;
