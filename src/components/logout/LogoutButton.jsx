import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import './LogoutButton.css'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>;
};

export default LogoutButton;
