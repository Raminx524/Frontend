import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
const BASE_URL = "http://localhost:3000/api/product/";

function productDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(`${BASE_URL}/${productId}`);
      setProduct(response.data);
    }
    getProduct();
  }, []);

  async function handleDelete() {
    await axios.delete(`${BASE_URL}/${productId}`);
    setProduct(null);
    navigate("/product");
  }

  return (
    <div>
      <h1>{product?.name}</h1>
      <p>{product?.category}</p>
      <p>${product?.price}</p>
      <p className="flex items-center gap-4">{product?.quantity}</p>
      <button
        className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
        onClick={handleDelete}
      >
        <Trash2 />
      </button>
      <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
        <Pencil />
      </button>
    </div>
  );
}

export default productDetailsPage;
