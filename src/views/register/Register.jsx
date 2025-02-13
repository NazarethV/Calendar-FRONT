import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

import './Register.css'

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "username":
        if (!value.trim()) errorMsg = "El nombre de usuario es obligatorio.";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = "Correo inválido.";
        break;
      case "password":
        if (value.length < 6) errorMsg = "La contraseña debe tener al menos 6 caracteres.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((err) => err)) return;
    await dispatch(register(userData));
    navigate("/login");
  };

  return (
    <div className="auth-register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input type="text" name="username" value={userData.username} onChange={handleChange} required />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} required />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={userData.password} onChange={handleChange} required />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" disabled={Object.values(errors).some((err) => err)}>Registrarme</button>
      </form>
      <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
    </div>
  );
};

export default Register;


// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { register } from "../../redux/actions/authActions";
// import { useNavigate } from "react-router-dom";

// import './Register.css'

// const Register = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(register(userData));
//     // Luego de registrarse, redirige a login
//     navigate("/login");
//   };

//   return (
//     <div>
//       <h2>Registro</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Usuario:</label>
//           <input
//             type="text"
//             name="username"
//             value={userData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Correo:</label>
//           <input
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Contraseña:</label>
//           <input
//             type="password"
//             name="password"
//             value={userData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Registrarme</button>
//       </form>
//       <p>
//         ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
//       </p>
//     </div>
//   );
// };

// export default Register;
