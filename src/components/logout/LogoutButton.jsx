import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

const LogoutButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="logout-container">
      <button className="logout-icon" onClick={() => setMenuOpen(!menuOpen)}>⚙️</button>
      {menuOpen && (
        <div className="logout-menu">
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;




// import React from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import './LogoutButton.css'

// const LogoutButton = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     dispatch({ type: "LOGOUT" });
//     navigate("/login");
//   };

//   return(  
//   <button className="logout-button" onClick={handleLogout}>
//     Cerrar Sesión
//   </button>
//   )
// };

// export default LogoutButton;
