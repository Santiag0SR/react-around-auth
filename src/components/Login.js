import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ handleLoginSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginSubmit(email, password);
    setEmail("");
    setPassword("");
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
