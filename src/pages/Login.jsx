import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
function Login({ setIsAuth }) {
  const setLogin = useContext(Context);
  let navigate = useNavigate();

  const signInWithGoogle = ({}) => {
    signInWithPopup(auth, provider).then((result) => {
      setLogin(true);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
    });
  };
  return (
    <div className="container">
      <div className="half-container">
        <div className="login-container">
          <div className="image-login">
            <img
              src="https://i.ibb.co/QMp0Yzn/juicy-boy-with-laptop-installing-security-passwords-shield-and-lock-on-his-pc-and-phone.png"
              alt="juicy-boy-with-laptop-installing-security-passwords-shield-and-lock-on-his-pc-and-phone"
              border="0"
            />
          </div>
          <h1 className="text-login">Welcome to Prysm</h1>
          <div className="buttons-google" onClick={signInWithGoogle}>
            <FcGoogle className="icons-google" size={30} />
            <p className="tulisan-google">Masuk dengan Google</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
