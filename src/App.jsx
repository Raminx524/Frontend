import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EditProductPage from "./pages/EditProductPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider } from "./contexts/userContext";
import UserProfile from "./pages/UserProfile";
import CreateProductPage from "./pages/CreateProduct";

function App() {
  return (
    <>
      <UserProvider>
        <div className="bg-gray-100 min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/product">
              <Route index element={<ProductPage />} />
              <Route path="create" element={<CreateProductPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
              <Route path=":productId/edit" element={<EditProductPage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </UserProvider>
    </>
  );
}

export default App;
