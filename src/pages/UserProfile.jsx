import React, { useEffect, useState } from "react";
import { useUserContext } from "../contexts/userContext";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
const URL = "http://localhost:3000/api/protected/users/";

function UserProfile() {
  const { user, logout, loading } = useUserContext();
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    localStorage.removeItem("token");
    navigate("/");
  }

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
    if (user) getProducts();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!localStorage.getItem("token")) return <Navigate to="/login" />;
  return (
    <div className="pb-16">
      <div className="w-full flex flex-col py-10">
        <button
          onClick={handleLogout}
          className="text-red-900 transition-all duration-300 hover:bg-red-900 hover:text-white px-4 py-2 bg-red-100 border border-red-200 self-end mr-44"
        >
          Log Out
        </button>
        <h1 className="self-center text-3xl font-bold text-blue-900">
          Hello {user ? `${user.firstName} ${user.lastName}` : ""}
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-2xl text-blue-900">Your Products: </p>
        <Link to="/product/create">
          <button className="relative left-96 text-blue-900 transition-all duration-300 hover:bg-blue-900 hover:text-white px-4 py-2 bg-blue-100 border border-blue-200">
            Add Product
          </button>
        </Link>
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
                  <p className="text-lg">{product.categories.join(", ")}</p>
                  <p>${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
