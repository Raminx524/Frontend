import React from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin } from "lucide-react";

function Footer() {
  return (
    <div className="flex justify-evenly items-center text-blue-900 bg-white shadow-sm  w-full py-4">
      <p className="text-2xl font-bold">
        "©2024 IITC/Ramin. All rights reserved."
      </p>
      <div className="flex gap-8 items-center">
        <p className="font-bold text-lg">Contact Us:</p>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <Mail />
            <p>Raminx524@Gmail.com</p>
          </div>
          <div className="flex gap-4">
            <Github />
            <Link to="https://github.com/Raminx524">Raminx524</Link>
          </div>
          <div className="flex gap-4">
            <Linkedin />
            <Link to="https://www.linkedin.com/in/ramin-aliev-3a4b8925b/">
              Ramin Aliev
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
