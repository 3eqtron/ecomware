import React from "react";
import Layout from "../scenes/layout";
import { AuthContext } from "../state/AuthContext";
import { useContext } from "react";
import Auth from "../Auth/Auth";

const Gateway = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return <>{user.userState === "loged in" ? <Layout /> : <Auth />}</>;
};

export default Gateway;
