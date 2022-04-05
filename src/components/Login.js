import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setEmail("");
          setPassword("");
          handleLogin();
          navigate("/");
        }
      })
      .catch(console.log);
  };

  return (
    <>
      <form className="form">
        <h2 className="form__title">Log in</h2>
        <input
          className="form__input"
          id="email-input"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form__input"
          id="password-input"
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button onClick={handleSubmit} className="form__submit">
        Log in
      </button>
      {/* link to login page */}
      <div className="from__redirection">
        <p>
          Not a member yet?{" "}
          <Link to="/singup" className="from__link">
            Sign up here!
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
