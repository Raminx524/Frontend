import React from "react";
import Input from "../components/ui-components/Input";
import { useUserContext } from "../contexts/userContext";
import api from "../services/api.service";
import { useNavigate } from "react-router-dom";
function CreateProductPage() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  async function handleSubmit(e) {
    e.preventDefault();
    const formElem = e.target;
    if (user) {
      const newProduct = {
        name: formElem.name.value,
        categories: formElem.categories.value.split(","),
        price: formElem.price.value,
        quantity: formElem.quantity.value,
      };
      try {
        await api.post("/product", newProduct);
        navigate(-1);
      } catch (error) {}
    }
  }
  return (
    <div className="flex justify-center my-24">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row sm:flex-col items-center sm:gap-3 bg-blue-200 w-96 p-4 text-blue-900 border border-blue-300"
      >
        <h2 className="text-3xl">Create Product</h2>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex justify-between min-w-72">
            <label htmlFor="name">Name:</label>
            <Input id="name"></Input>
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="categories">Categories:</label>
            <Input id="categories"></Input>
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="price">Price:</label>
            <Input id="price"></Input>
          </div>
          <div className="flex justify-between min-w-72">
            <label htmlFor="quantity">Quantity:</label>
            <Input id="quantity"></Input>
          </div>
        </div>

        <button className="text-blue-900 transition-all duration-300 hover:bg-blue-900 hover:text-white px-4 py-2 bg-blue-100 border border-blue-200">
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateProductPage;
