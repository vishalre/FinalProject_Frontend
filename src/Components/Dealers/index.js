import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AddProductAction,
  getProductsAction,
  RemoveProductAction,
} from "../Actions/AddProduct";
import "./login.css";
const Dealers = () => {
  const [start, setStart] = useState(true);
  const [data, updateData] = useState({
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
  const [errors, updateErrors] = useState({});
  const [valid, setValid] = useState(false);
  const [products, setProducts] = useState([]);

  const putData = (event) => {
    const { name, value } = event.target;
    updateData({ ...data, [name]: value });
  };
  const dataSubmit = (event) => {
    event.preventDefault();
    updateErrors(validation(data));
    setValid(true);
  };
  const deleteItem = (id) => {
    RemoveProductAction(id).then((data) =>
      getProductsAction().then((data) => setProducts(data))
    );
  };

  useEffect(() => {
    if (start) {
      getProductsAction().then((data) => setProducts(data));
      setStart(false);
    }
    if (Object.keys(errors).length === 0 && valid) {
      AddProductAction(data).then((data) => {
        if (data.success) {
          getProductsAction().then((data) => setProducts(data));
        }
      });
    }
    /* eslint-disable-next-line */
  }, [errors, valid]);
  const validation = (value) => {
    const errors = {};
    if (!value.name) {
      errors.name = "Product Name is required";
    }
    if (!value.imageUrl) {
      errors.imageUrl = "Image Url is Required";
    }
    if (!value.price) {
      errors.price = "Price is Required";
    }
    return errors;
  };
  return (
    <>
      <div className="mx-auto my-5 p-5 wd-dealer-container">
        <div className="wd-form-login-text">
          <h3>Add Product</h3>
        </div>
        <form>
          <div className="form-floating my-3">
            <input
              type="text"
              className={`form-control${errors.name ? " is-invalid" : ""}`}
              id="Name"
              name="name"
              value={data.name}
              onChange={(event) => putData(event)}
            />
            <label htmlFor="Name">Product Name</label>
            <p className="text-danger">{errors.name ? errors.name : ""}</p>
          </div>
          <div className="form-floating my-3">
            <input
              type="text"
              className={`form-control${errors.imageUrl ? " is-invalid" : ""}`}
              id="ImageUrl"
              name="imageUrl"
              value={data.imageUrl}
              onChange={(event) => putData(event)}
            />
            <label htmlFor="ImageUrl">Image URL</label>
            <p className="text-danger">
              {errors.imageUrl ? errors.imageUrl : ""}
            </p>
          </div>
          <div className="form-floating my-3">
            <input
              type="number"
              className={`form-control${errors.price ? " is-invalid" : ""}`}
              id="Price"
              name="price"
              value={data.price}
              onChange={(event) => putData(event)}
            />
            <label htmlFor="Price">Price </label>
            <p className="text-danger">{errors.price ? errors.price : ""}</p>
          </div>

          <div className="form-floating my-3">
            <input
              type="text"
              className={`form-control${
                errors.manufacturer ? " is-invalid" : ""
              }`}
              id="Manufacturer"
              name="manufacturer"
              value={data.manufacturer}
              onChange={(event) => putData(event)}
            />
            <label htmlFor="Manufacturer">Manufacturer </label>
            <p className="text-danger">
              {errors.manufacturer ? errors.manufacturer : ""}
            </p>
          </div>

          <div className="form-floating my-3">
            <input
              type="text"
              className={`form-control${errors.asin ? " is-invalid" : ""}`}
              id="Asin"
              name="asin"
              value={data.asin}
              onChange={(event) => putData(event)}
            />
            <label htmlFor="Asin">ASIN </label>
            <p className="text-danger">{errors.asin ? errors.asin : ""}</p>
          </div>

          <div className="form-floating my-3">
            <input
              type="text"
              className={`form-control${errors.country ? " is-invalid" : ""}`}
              id="Country"
              name="country"
              value={data.country}
              onChange={(event) => putData(event)}
            />
            <label htmlFor="Country">Country </label>
            <p className="text-danger">
              {errors.country ? errors.country : ""}
            </p>
          </div>

          <div className="form-floating my-3">
            <input
              type="number"
              className={`form-control${
                errors.originalPrice ? " is-invalid" : ""
              }`}
              id="OriginalPrice"
              name="originalPrice"
              value={data.originalPrice}
              onChange={(event) => putData(event)}
            />
            <label htmlFor="OriginalPrice">Original Price </label>
            <p className="text-danger">
              {errors.originalPrice ? errors.originalPrice : ""}
            </p>
          </div>

          <div className="form-floating my-3">
            <input
              type="number"
              className={`form-control${errors.discount ? " is-invalid" : ""}`}
              id="Discount"
              name="discount"
              value={data.discount}
              onChange={(event) => putData(event)}
            />
            <label htmlFor="Discount">Discount </label>
            <p className="text-danger">
              {errors.discount ? errors.discount : ""}
            </p>
          </div>

          <div className="form-floating my-3">
            <input
              type="number"
              className={`form-control${
                errors.discountPercentage ? " is-invalid" : ""
              }`}
              id="DiscountPercentage"
              name="discountPercentage"
              value={data.discountPercentage}
              onChange={(event) => putData(event)}
            />
            <label htmlFor="DiscountPercentage">Discount Percentage </label>
            <p className="text-danger">
              {errors.discountPercentage ? errors.discountPercentage : ""}
            </p>
          </div>

          <div className="form-floating my-3">
            <input
              type="text"
              className={`form-control${errors.currency ? " is-invalid" : ""}`}
              id="Currency"
              name="currency"
              value={data.currency}
              onChange={(event) => putData(event)}
            />
            <label htmlFor="Currency">Currency </label>
            <p className="text-danger">
              {errors.currency ? errors.currency : ""}
            </p>
          </div>
          <div>
            <button
              className="btn btn-primary rounded-pill w-100 p-2"
              onClick={(event) => dataSubmit(event)}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
      <div className="mx-auto my-5 p-5 wd-dealer-container">
        <h3 className="mb-3 wd-form-login-text">All Products</h3>
        <div className="row">
          {products &&
            products.map((element) => (
              <div className="col col-xl-3 my-2" key={element._id}>
                <div className="card wd-card h-100">
                  <img
                    src={element.imageUrl}
                    className="card-img-top"
                    alt={element.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <p className="card-text">Price : {element.price}</p>
                  </div>

                  <div className="row mx-auto mb-auto">
                    <div className="col-12 w-75 my-2">
                      {element.asin && (
                        <Link to={`/details_db/${element._id}`}>
                          <button className="btn btn-primary w-100">
                            Show
                          </button>
                        </Link>
                      )}
                    </div>
                    <div className="col-12 w-100 mb-3">
                      <button
                        className="btn btn-danger w-75"
                        onClick={() => deleteItem(element._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
export default Dealers;
