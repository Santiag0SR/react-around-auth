import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  // create necessary state variables
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (password === confirmPassword) {
      // TODO -- handle registration
    }
  };

  return (
    <div className="register">
      <p className="register__welcome">Please register.</p>
      <form className="register__form">
        <label>Username:</label>
        {/* onChange prop sets the state whenever the input's value changes */}
        <input
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email:</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password:</label>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </form>
      <div className="register__button-container">
        <button onClick={handleSubmit} className="register__link">
          Sign up
        </button>
      </div>
      {/* link to login page */}
      <div className="register__signin">
        <p>Already a member?</p>
        <Link to="login" className="register__login-link">
          Log in here
        </Link>
      </div>
    </div>
  );
}

export default Register;
