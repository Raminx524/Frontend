import React from "react";
import homeImg from "../assets/homePage2.jpg";
import homeCartIcon from "../assets/cartIcon.png";

function HomePage() {
  return (
    <main className="flex items-center flex-grow">
      <div className="py-32 flex flex-col items-center max-w-3xl m-auto text-center gap-6 z-10 relative left-20">
        <h1 className="text-6xl font-bold uppercase">
          Your Ultimate Shopping Destination
        </h1>
        <p className="max-w-xl text-xl">
          Welcome to Your Ultimate Shopping Destination! Explore a world of
          endless possibilities with unbeatable deals and a vast selection
          tailored just for you
        </p>
        <a
          href="/product"
          className="flex items-center text-blue-900 transition-all duration-300 hover:bg-blue-900 hover:text-white px-4 py-2 bg-blue-100 border border-blue-200"
        >
          explore more
          <img src={homeCartIcon} alt="Cart Icon" className="w-10 z-10" />
        </a>
      </div>
      <div className="relative flex justify-center">
        <img src={homeImg} alt="Marketplace" className="w-3/4" />
      </div>
    </main>
  );
}

export default HomePage;
