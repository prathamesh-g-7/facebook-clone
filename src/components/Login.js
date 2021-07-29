import React from "react";
import "./Login.css";
import { auth, provider } from "../Firebase/firebase";

function Login() {
  const loginWithFacebook = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__containerItems">
          <img src="/login-logo.svg" alt="" />
          <button onClick={loginWithFacebook}>Login With Facebook</button>
          <div className="create">Create New Account</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
