import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import Cookies from "universal-cookie";
import { FaEnvelope, FaLock } from "react-icons/fa";


const cookies = new Cookies();

const Login = () => {
  
  const [datos, setDatos] = useState(null);
  const [credenciales, setCredenciales] = useState({ email: "", password: "" });
  const [cooki,setCooki] = useState(cookies);

  const api = helpHttp();
  const url = "http://localhost:5000/user";

  useEffect(() => {
    api.get(url).then((res) => {
      if (!res.err) {
        setDatos(res);
      } else {
        setDatos(null);
        console.log(res.err);
      }
    });
  }, [url]);

  useEffect(() => {
    if (cooki.get('email')) {
      window.location.href = "./formulario";
      setCooki(cooki)
    }
  }, [cooki.email]);


  const handleChange = (e) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credenciales.email || !credenciales.password) {
      alert("completa los campos");
      return;
    }

    if (datos && credenciales.email.trim() !== "") {      
      const usuarioEncontrado = datos.find(
        (usuario) => usuario.email === credenciales.email
      );

      if (usuarioEncontrado) {
        console.log("Usuario encontrado:", usuarioEncontrado);
        cookies.set("email", usuarioEncontrado.email, { path: "/" });
        window.location.href = "./formulario";
      } else {
        alert("usuario no encontrado");       
      }
    }
    
  };
  
  return (
    
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <h2 className="fw-bold mb-5 text-black text-uppercase text-center ">
              TEST-ELECTIONS
            </h2>
            <div className="card  text-white">
              <div className="card-body p-6 text-center">
                <div className="mb-md-5 mt-md-4 pb-2">
                  <h4 className="text-black mb-5 opacity-75">
                    sing in to start your session
                  </h4>
                  <div className="mb-3 input-with-icon input-container">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Nombre de usuario"
                      value={credenciales.email}
                      onChange={handleChange}
                      name="email"
                      required
                    />
                    <FaEnvelope className="icono input-icon" />
                  </div>
                  <div className="mb-3 input-with-icon2 input-container">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Contraseña"
                      value={credenciales.password}
                      onChange={handleChange}
                      name="password"
                      required
                    />
                    <FaLock className="icono input-icon" />
                  </div>
                  <div className="container">
                    <div className="row justify-content-end">
                      <div className="col-auto">
                      <button
                    type="button"
                    className="btn btn-primary boton"
                    onClick={handleSubmit}
                  >
                    Sing in
                  </button>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
