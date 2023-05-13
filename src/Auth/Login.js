import React from "react";
import "./Register.css";
import { useState } from "react";
import { toast } from "react-toastify";
const Login = (props) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handelIden = (e) => {
    setIdentifier(e.target.value);
  };

  const handelPassi = (e) => {
    setPassword(e.target.value);
  };

  const handelLog = () => {
    if (identifier === "" || password === "") {
      toast.error("enter your credentials before!");
      return;
    } else {
      props.setVal({
        email: identifier,
        password: password,
      });
      props.setL(true);
    }
  };

  return (
    <div className="regiterk-container">
      <h2>Log In </h2>

      <div className="input">
        <input type="email" id="email" onChange={handelIden} />
        <label htmlFor="email" className="label">
          Email *
        </label>
      </div>
      <div className="input">
        <input type="password" id="password" onChange={handelPassi} />
        <label htmlFor="password">Password *</label>
      </div>

      <button onClick={handelLog}>Connect</button>
    </div>
  );
};

export default Login;
