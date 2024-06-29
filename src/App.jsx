import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EditProductPage from "./pages/EditProductPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product">
          <Route index element={<ProductPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
          <Route path=":productId/edit" element={<EditProductPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
