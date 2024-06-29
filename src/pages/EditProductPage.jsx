import React, { useEffect, useState } from "react";
import Input from "../components/ui-components/Input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/product/";
function EditProductPage() {
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const { productId } = useParams();
  async function handleEdit(e) {
    e.preventDefault();
    const formElem = e.target;
    const newProduct = {
      name: formElem.name.value,
      category: formElem.category.value,
      price: formElem.price.value,
      quantity: formElem.quantity.value,
    };
    try {
      await axios.patch(BASE_URL + productId, newProduct);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(BASE_URL + productId);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProduct();
  }, []);
  if (product === "") return <p>Loading...</p>;
  return (
    <div className="flex justify-center my-24">
      <form
        onSubmit={handleEdit}
        className="flex flex-row sm:flex-col items-center sm:gap-3 bg-blue-200 w-96 p-4 text-blue-900 border border-blue-300"
      >
        <h2 className="text-3xl">Edit {product.name}</h2>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex justify-between min-w-72">
            <label htmlFor="name">Name:</label>
            <Input value={product.name} id="name"></Input>
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="category">Category:</label>
            <Input value={product.category} id="category"></Input>
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="price">Price:</label>
            <Input value={product.price} id="price"></Input>
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="quantity">Quantity:</label>
            <Input value={product.quantity} id="quantity"></Input>
          </div>
        </div>

        <button className="text-blue-900 transition-all duration-300 hover:bg-blue-900 hover:text-white px-4 py-2 bg-blue-100 border border-blue-200">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;
