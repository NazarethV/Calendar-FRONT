
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

import './Login.css'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  //const { error } = useSelector((state) => state.auth || {}); 
  const error = useSelector((state) => state.error || null);

  const validate = (name, value) => {
    let errorMsg = "";
    if (!value.trim()) errorMsg = "Este campo es obligatorio.";
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err)) return;

    try{
      await dispatch(login(credentials));
      navigate("/home");
    }catch(error){
      //ERROR
    }
    
  };

  return (
    <div className="auth-login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" disabled={Object.values(errors).some((err) => err)}>Ingresar</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
    </div>
  );
};

export default Login;



