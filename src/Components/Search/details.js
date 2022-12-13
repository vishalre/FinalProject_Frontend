import React, { useState, useEffect } from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { isDealerService } from "../../Services/LoginService";
import { AddProductAction } from "../Actions/AddProduct";
import "./index.css";
import Spinner from 'react-bootstrap/Spinner';

import CreateReviews from "../CreateReviews";
import Likes from "../Likes";

const Details = () => {
  const [productTitle, setproductTitle] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading,setLoading] = useState(false);
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
  const location = useLocation();
  const { productState } = location.state;
  const product_id = productState.product_id;
  const login = useSelector((state) => state.LogIn);

  const addToCart = (response) => {
    const productData = {
      name: productState.product_title,
      asin: product_id,
      imageUrl: response.data.product_main_image_url,
      manufacturer: response.data.product_details["_Manufacturer_"],
      originalPrice: Number(
          response.data.price_information["original_price"]),
      price: Number(response.data.price_information["app_sale_price"]),
      currency: response.data.price_information["currency"],
      discount: Number(response.data.price_information["discount"]),
      discountPercentage: Number(response.data.price_information["discount_percentage"]),
    }
    console.log("Product data   ",response);
    AddProductAction(productData);
  };
  const productDetails = () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: `https://amazon24.p.rapidapi.com/api/product/${product_id}`,
      params: { country: "US" },
      headers: {
        "X-RapidAPI-Host": "amazon24.p.rapidapi.com",
        "X-RapidAPI-Key": "3b61e0c512msh690536547fe6d4fp15106ejsnba48c56b1d01",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        addToCart(response);
        setproductTitle(productState.product_title);
        setProduct(response.data.product_details);
        setPriceInfo(response.data.price_information);
        setProductAllDetails(response.data);
        setData({
          ...data,
          name: productState.product_title,
          asin: product_id,
          imageUrl: response.data.product_main_image_url,
          manufacturer: response.data.product_details["_Manufacturer_"],
          originalPrice: Number(
            response.data.price_information["original_price"]
          ),
          price: Number(response.data.price_information["app_sale_price"]),
          currency: response.data.price_information["currency"],
          discount: Number(response.data.price_information["discount"]),
          discountPercentage: Number(
            response.data.price_information["discount_percentage"]
          ),
        });
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    productDetails();
    /* eslint-disable-next-line */
  }, []);

  return (
    loading === true ? (
      <div className="d-flex flex-column align-items-center bg-white justify-content-center">
        <Spinner animation="border" role="status" style={{marginTop:"300px"}}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
      ):(
      <div>
        <h1>{productTitle}</h1>
        {login.logedIn && (
          <div className="mt-4 mx-4" style={{ fontSize: "30px" }}>
              <div className="mx-auto">
                <Likes pid={product_id} />
              </div>
            <p style={{ fontSize: "14px" }}>Like</p>
          </div>
        )}
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
        </ul>
        <div>
          <CreateReviews productID={product_id} product={product} />
        </div>
      </div>
      )
  );
};

export default Details;
