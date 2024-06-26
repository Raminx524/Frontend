import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";

const BASE_URL = "http://localhost:3000/api/product/";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    async function getProducts() {
      const page = searchParams.get("page");
      if (page < 1) searchParams.set("page", 1);
      setSearchParams(searchParams);

      const options = {
        params: {
          name: searchParams.get("name"),
          category: searchParams.get("category"),
          quantity: searchParams.get("quantity"),
          minPrice: searchParams.get("minPrice"),
          maxPrice: searchParams.get("maxPrice"),
          page: page,
        },
      };
      const response = await axios.get(BASE_URL, options);
      setProducts(response.data);
    }
    getProducts();
  }, [searchParams]);

  function handleFilterChange(ev) {
    const inputName = ev.target.name;

    if (ev.target.type === "checkbox") {
      const checked = ev.target.checked;
      searchParams.set(inputName, checked);
    } else {
      const value = ev.target.value;
      searchParams.set(inputName, value);
    }

    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function handlePagination(ev) {
    const value = ev.target.value;
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <div className="my-8 space-y-2 flex gap-4 items-baseline flex-col sm:flex-col sm:">
        <div>
          <div>
            <label htmlFor="page">Page: </label>
            <input
              className="outline outline-black rounded-md"
              min={1}
              id="page"
              name="page"
              type="number"
              value={searchParams.get("page") || "1"}
              onChange={handlePagination}
            />
          </div>
        </div>
        <div>
          <label htmlFor="isInStock">isInStock: </label>
          <input
            className="outline border-black"
            id="isInStock"
            name="isInStock"
            type="checkbox"
            checked={searchParams.get("isInStock") === "true" || false}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            className="outline outline-black rounded-md"
            id="name"
            name="name"
            type="text"
            value={searchParams.get("name") || ""}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category: </label>
          <input
            className="outline outline-black rounded-md"
            id="category"
            name="category"
            type="text"
            value={searchParams.get("category") || ""}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="minPrice">Minimum Price: </label>
          <input
            className="outline outline-black rounded-md"
            id="minPrice"
            type="number"
            name="minPrice"
            value={searchParams.get("minPrice") || 0}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Maximum Price: </label>
          <input
            className="outline outline-black rounded-md"
            id="maxPrice"
            type="number"
            name="maxPrice"
            value={searchParams.get("maxPrice") || 100}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {products.map((product) => {
          return (
            <li className="bg-gray-300 p-4" key={product._id}>
              <Link to={`${product._id}`}>
                <h4>{product.name}</h4>
                <p>{product.category}</p>
                <p>{product.price}</p>
                <p>{product.quantity}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductPage;
