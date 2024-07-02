import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Input from "../components/ui-components/Input";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const BASE_URL = "http://localhost:3000/api/product/";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sliderValue, setSliderValue] = useState([0, 10000]);
  useEffect(() => {
    searchParams.set("limit", 9);
  }, []);
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
          limit: searchParams.get("limit"),
          page: page,
        },
      };
      const res = await axios.get(`${BASE_URL}/count`, options);
      const totalProducts = res.data.count;
      const response = await axios.get(BASE_URL, options);
      setMaxPages(Math.ceil(totalProducts / +searchParams.get("limit")));
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
    const elem = ev.target;
    if (elem["data-testid"] === "NavigateNextIcon") {
      console.log("hi");
    }
    const value = elem.innerText;
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }
  function valuetext(value) {
    return `$${value}`;
  }
  const handleSliderChange = (ev, newValue) => {
    searchParams.set("minPrice", newValue[0]);
    searchParams.set("maxPrice", newValue[1]);
    setSearchParams(searchParams);
    setSliderValue(newValue);
  };
  return (
    <div className="flex flex-col items-center max-w-7xl m-auto pb-8">
      <h1 className="text-3xl font-bold pt-7 text-blue-900">All Products:</h1>
      <div className="my-8 flex-wrap space-y-2 flex gap-4 items-baseline flex-col sm:flex-row ">
        <div className="flex items-center gap-1">
          <label htmlFor="isInStock">isInStock: </label>
          <Input
            customStyle="w-5 h-5"
            id="isInStock"
            name="isInStock"
            type="checkbox"
            checked={searchParams.get("isInStock") === "true" || false}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={searchParams.get("name") || ""}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category: </label>
          <Input
            id="category"
            name="category"
            type="text"
            value={searchParams.get("category") || ""}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="limit">Items Per Page: </label>
          <select
            name="limit"
            id="limit"
            onChange={handleFilterChange}
            className="border border-blue-200 focus:outline-none focus:border-blue-500 transition-all duration-300"
          >
            <option value="9">9</option>
            <option value="6">6</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <div className="flex gap-10 justify-center">
        <label>Price:</label>
        <Box sx={{ width: 400 }}>
          <Slider
            getAriaLabel={() => "Price range"}
            value={sliderValue}
            min={0}
            max={2000}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>
      </div>
      <ul className="flex gap-5 justify-center my-10 flex-wrap">
        {products.map((product) => {
          return (
            <li
              className="bg-blue-100 border border-blue-200 text-blue-900 p-4 w-1/4 min-w-80 flex flex-col justify-center text-center hover:border-blue-950 transition-all duration-300"
              key={product._id}
            >
              <Link to={`${product._id}`}>
                <h4 className="text-2xl mb-3">{product.name}</h4>
                <p className="text-lg">{product.categories.join(", ")}</p>
                <p>${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="w-full flex justify-center">
        <Pagination
          count={maxPages}
          color="primary"
          onClick={handlePagination}
        />
      </div>
    </div>
  );
}

export default ProductPage;
