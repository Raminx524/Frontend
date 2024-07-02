import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useUserContext } from "../contexts/userContext";
import api from "../services/api.service";
const BASE_URL = "http://localhost:3000/api/product/";

function productDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { user, loading } = useUserContext();

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(`${BASE_URL}/${productId}`);
      setProduct(response.data);
    }
    getProduct();
  }, []);

  async function handleDelete() {
    await api.delete(`product/${productId}`);
    setProduct(null);
    navigate(-1);
  }
  if (loading) return <p>Loading...</p>;
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex items-center justify-center gap-32 py-20 max-w-7xl m-auto">
      <div className="text-blue-900">
        <h1 className="text-4xl mb-5">{product?.name}</h1>
        <p className="text-xl">{product?.categories.join(", ")}</p>
        <p className="">${product?.price}</p>
        <p className="flex items-center gap-4">Quantity: {product?.quantity}</p>
        {user && user._id === product.user ? (
          <>
            <button
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
              onClick={handleDelete}
            >
              <Trash2 />
            </button>
            <Link to="edit">
              <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                <Pencil />
              </button>
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
      <img src="https://i.imgflip.com/8ve1vg.jpg" alt="test" className="w-96" />
    </div>
  );
}

export default productDetailsPage;
