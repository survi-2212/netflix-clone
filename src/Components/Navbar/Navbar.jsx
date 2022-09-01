import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Logo from "./Logo.png";
import { useNavigate } from "react-router-dom"

function Navbar() {
  const [Scroll, setScroll] = useState(false);
const navigate=useNavigate();
  const handleNavbar = () => {
    if (window.scrollY > 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNavbar);

    return () => window.removeEventListener("scroll", handleNavbar);
  }, []);

  return (
    <div className={`nav ${Scroll && "nav_bar"}`}>
      <div className="navabr_content">
        <img className="nav_logo" src={Logo} alt="logo" 
          onClick={()=>navigate("/")}
        />

        <img
          className="nav_avatar"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt=""
          srcset=""
          onClick={()=>navigate("/profile")}
        />
      </div>
    </div>
  );
}

export default Navbar;
