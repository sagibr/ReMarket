import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handlePasswordChange = (value) => {
    setPassword(value);
    console.log(password);
  };
  const handleEmailChange = (value) => {
    setEmail(value);
    console.log(email);
  };

  const handleSubmit = () => {
    axios
      .get(`http://localhost:3001/users`, {
        password: password,
        email: email,
      })
      .then((res) => res.data && console.log(res.data));
  };
  return (
    <div>
      <div className="Login">
        <h1>Log-in</h1>
        <div>
          <label>Email</label>
          <input
            type="text"
            onChange={(e) => {
              handleEmailChange(e.target.value);
            }}
          />
        </div>
        <div className="input">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              handlePasswordChange(e.target.value);
            }}
          />
        </div>
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  );
}

export default Login;
