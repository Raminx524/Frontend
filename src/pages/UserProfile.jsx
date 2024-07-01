import React, { useEffect, useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const URL = "http://localhost:3000/api/protected/users/";

function UserProfile() {
  const { user } = useUserContext();
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get(URL + user._id + "/products", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProducts();
  }, []);

  useEffect(() => {
    if (user === undefined) {
      console.log(user);
      navigate("/");
    }
  }, [user]);
  return (
    <div>
      <h1>Hello {user ? `${user.firstName} ${user.LastName}` : ""}</h1>
      <div className="flex">
        <p>Your Products: </p>
        <button>Add Product</button>
      </div>
      {products !== null ? (
        <ul className="flex gap-5 justify-center my-10 flex-wrap">
          {products.map((product) => {
            return (
              <li
                className="bg-blue-100 border border-blue-200 text-blue-900 p-4 w-1/4 min-w-80 min-h-48 flex flex-col justify-center text-center hover:border-blue-950 transition-all duration-300"
                key={product._id}
              >
                <Link to={`/product/${product._id}`}>
                  <h4 className="text-2xl mb-3">{product.name}</h4>
                  <p className="text-lg">{product.category}</p>
                  <p>${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default UserProfile;
