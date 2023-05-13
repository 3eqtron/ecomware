import React from "react";
import "./Auth.css";
import Login from "./Login";
import Register from "./Register";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../state/AuthContext";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const styleForSelected = {
    backgroundColor: "#463F00",
    color: "rgb(252, 253, 253)",
    borderRadius: 0,
  };
  const [styledLogin, setStyledLogin] = useState({});
  const [styledSign, setStyledSign] = useState({});
  const [isRegistred, setIsRegistred] = useState(false);

  const [Values, setValues] = useState({});
  const [loginValues, setLoginVal] = useState({});

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  /*-------------------context here------------------*/

  const { user, login } = useContext(AuthContext);
  // console.log(user);

  /*--------Register NEW User-----------------------*/
  useEffect(() => {
    const isEmpty = Object.keys(Values).length === 0;
    if (!isEmpty) {
      const fanc = async () => {
        try {
          const { data } = await axios.post("user/signup", Values);
          // console.log({ "this is the user JWT": data.jwt });
          localStorage.setItem("CurrentUser", JSON.stringify(data));
          login();
          setLoading(false);
          toast.success("Congratulation you're registred successfully!");
          navigate("/dashboard");
        } catch (err) {
          console.log(err);
          toast.error("error try again");
          setLoading(false);
        }
      };
      fanc();
    }
  }, [Values]);
  /*------------------------------------*/

  /*-------------Log in user Here --------------*/

  useEffect(() => {
    const isEmpty = Object.keys(loginValues).length === 0;
    if (!isEmpty) {
      const fanc = async () => {
        try {
          const { data } = await axios.post("user/login", loginValues);
          console.log({ "this is the user JWT": data.jwt });
          localStorage.setItem("CurrentUser", JSON.stringify(data));
          login();
          setLoading(false);
          toast.success("Congratulation you're logged successfully!");
          navigate("/dashboard");
        } catch (err) {
          console.log(err);
          toast.error("Failed To Log in !");
          setLoading(false);
        }
      };
      fanc();
    }
  }, [loginValues]);

  /*---------------------------*/

  useEffect(() => {
    if (isRegistred) {
      setStyledLogin(styleForSelected);
      setStyledSign({});
    } else {
      setStyledSign(styleForSelected);
      setStyledLogin({});
    }
  }, [isRegistred]);

  /*----------------handlers here ----------*/

  const handelSignUp = () => {
    setStyledSign(styleForSelected);
    setStyledLogin({});
    setIsRegistred(false);
  };
  const handelLogIn = () => {
    setStyledLogin(styleForSelected);
    setStyledSign({});
    setIsRegistred(true);
  };
  return (
    <>
      {user.userState === "Loged out" && (
        <div className="Centralisation-authk">
          <div className="authContainerk">
            <div className="switcher-authk-container">
              <div className="switcher-authk">
                <button onClick={handelSignUp} style={styledSign}>
                  Sign Up
                </button>
                <button onClick={handelLogIn} style={styledLogin}>
                  Log In
                </button>
              </div>
            </div>
            {loading ? (
              <div className="icon-containerk">
                <LoadingOutlined
                  style={{ fontSize: "600%", color: "#463F00" }}
                />
              </div>
            ) : (
              <>
                {isRegistred ? (
                  <Login
                    setVal={(prop) => setLoginVal(prop)}
                    setL={(prop) => {
                      setLoading(prop);
                    }}
                  />
                ) : (
                  <Register
                    setV={(prop) => setValues(prop)}
                    setL={(prop) => {
                      setLoading(prop);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
