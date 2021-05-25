import axios from "axios";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import AppContext from "../../AppContext";

export default function AddProduct() {
  const { user, addProduct } = useContext(AppContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [flash, setFlash] = useState({});

  const save = async e => {
    e.preventDefault();

    if (name && price) {
      const id =
        Math.random().toString(36).substring(2) + Date.now().toString(36);

      await axios.post("http://localhost:3001/products", {
        id,
        name,
        price,
        stock,
        shortDesc,
        description,
      });

      addProduct({
        name,
        price,
        shortDesc,
        description,
        stock: stock || 0,
      });
      setFlash({ status: "is-success", msg: "Product created successfully" });
    } else {
      setFlash({ status: "is-danger", msg: "Please enter name and price" });
    }
  };

  const handleChange = e => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "stock":
        setStock(e.target.value);
        break;
      case "shortDesc":
        setShortDesc(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      default:
    }
  };

  return user && user.accessLevel === 0 ? (
    <>
      <div className="hero is-primary ">
        <div className="hero-body container">
          <h4 className="title">Add Product</h4>
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={save}>
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
              <label className="label">Product Name: </label>
              <input
                className="input"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label className="label">Price: </label>
              <input
                className="input"
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label className="label">Available in Stock: </label>
              <input
                className="input"
                type="number"
                name="stock"
                value={stock}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Short Description: </label>
              <input
                className="input"
                type="text"
                name="shortDesc"
                value={shortDesc}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Description: </label>
              <textarea
                className="textarea"
                type="text"
                rows="2"
                style={{ resize: "none" }}
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>
            {flash && (
              <div className={`notification ${flash.status}`}>{flash.msg}</div>
            )}
            <div className="field is-clearfix">
              <button
                className="button is-primary is-outlined is-pulled-right"
                type="submit"
                onClick={save}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  ) : (
    <Redirect to="/" />
  );
}
