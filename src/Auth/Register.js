import React from "react";
import "./Register.css";
import { useState } from "react";
import location from "../data/Location.json";
import { toast } from "react-toastify";

const Register = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [Loc, setLoc] = useState(0);

  const Gov = [
    "Tunis",
    "Ariana",
    "Manouba",
    "Ben Arous",
    "Nabeul",
    "Bizerte",
    "Zaghouan",
    "Sousse",
    "Monastir",
    "Mahdia",
    "Sfax",
    "Beja",
    "Jendouba",
    "Kef",
    "Siliana",
    "Kairouan",
    "Sidi Bouzid",
    "Kasserine",
    "Gabes",
    "Medenine",
    "Gafsa",
    "Tozeur",
    "Tataouine",
    "Kebili",
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passTwo, setPassTwo] = useState("");
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [governorat, setGovernorat] = useState("");
  const [delegations, setDelegations] = useState("");
  const [phone, setPhone] = useState("");
  const [cname, setCname] = useState("");
  const [mf, setMf] = useState("");
  /*------------------handlers here---------------------------------------------*/
  const handelNext1 = () => {
    setCurrentStep(1);
  };

  const handelBack0 = () => {
    setCurrentStep(0);
  };
  const handelNext2 = () => {
    setCurrentStep(2);
  };
  const handelBack1 = () => {
    setCurrentStep(1);
  };

  const handelLoc = (e) => {
    setLoc(Gov.indexOf(e.target.value));
    setGovernorat(e.target.value);
  };

  const handelDeleg = (e) => {
    setDelegations(e.target.value);
  };

  const handelEmail = (e) => {
    setEmail(e.target.value);
  };
  const handelPass1 = (e) => {
    setPassword(e.target.value);
  };
  const handelPass2 = (e) => {
    setPassTwo(e.target.value);
  };
  const handelFname = (e) => {
    setFname(e.target.value);
  };
  const handelLname = (e) => {
    setLname(e.target.value);
  };

  const handelPhone = (e) => {
    setPhone(e.target.value);
  };

  const handelCname = (e) => {
    setCname(e.target.value);
  };
  const handelMf = (e) => {
    setMf(e.target.value);
  };
  /*--------------------------------Submit data here------------------------------*/
  const handelSubmit = () => {
    if (!email) {
      toast.error("you didn't type your email!");
      return;
    }
    if (!password) {
      toast.error("you didn't type your password!");
      return;
    }
    if (password !== passTwo) {
      toast.error("your password didn't match!");
      return;
    }
    if (!fName) {
      toast.error("you didn't type your first name!");
      return;
    }
    if (!lName) {
      toast.error("you didn't type your last name!");
      return;
    }
    if (!governorat) {
      toast.error("you didn't choose your governorat!");
      return;
    }
    if (!delegations) {
      toast.error("you didn't choose your delegation!");
      return;
    }
    if (!phone) {
      toast.error("you didn't enter your phone");
      return;
    }
    if (!cname) {
      toast.error("you didn't enter your company name");
      return;
    }
    if (!mf) {
      toast.error("you didn't enter the Matricule Fiscale");
      return;
    }

    props.setV({
      email: email,
      password: password,
      nom: fName + " " + lName,
      adresse: governorat + " " + delegations,
      name: cname,
      contact_num: phone,
      responsable: fName,
      entreprise_id: mf,
    });
    props.setL(true);
  };

  /*---------------------------------------------------------------------------------------*/

  return (
    <div className="regiterk-container">
      {currentStep === 0 && (
        <>
          <h2>Sign Up</h2>
          <div className="input"></div>
          <div className="input">
            <input type="email" id="email" onChange={handelEmail} />
            <label htmlFor="email" className="label">
              Email*
            </label>
          </div>
          <div className="input">
            <input type="password" id="password" onChange={handelPass1} />
            <label htmlFor="password">Password*</label>
          </div>
          <div className="input">
            <input type="password" id="passwordv" onChange={handelPass2} />
            <label htmlFor="passwordv">Verify Password*</label>
          </div>
          <button onClick={handelNext1}>Next</button>
        </>
      )}

      {currentStep === 1 && (
        <>
          <h2>Who you are?</h2>
          <div className="input">
            <input
              type="text"
              id="name"
              placeholder="First Name"
              onChange={handelFname}
            />
            <label>First Name*</label>
          </div>
          <div className="input">
            <input
              type="text"
              id="name"
              placeholder="Last Name"
              onChange={handelLname}
            />
            <label>Last Name*</label>
          </div>

          <select onChange={handelLoc}>
            <option value="">Select your governorat</option>
            {Gov.map((item) => {
              return (
                <>
                  <option value={item}>{item}</option>
                </>
              );
            })}
          </select>

          <select onChange={handelDeleg}>
            <option value="">Select your delegation</option>
            {location[Loc][Gov[Loc]].map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>

          <div className="btnk-auth-cont">
            <button onClick={handelBack0}>Back</button>
            <button onClick={handelNext2}>Next</button>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h2>What is your company Name?</h2>
          <div className="input">
            <input
              type="text"
              id="cname"
              placeholder="company name"
              onChange={handelCname}
            />
            <label>Societe </label>
          </div>

          <div className="input">
            <input
              type="text"
              id="phone"
              placeholder="+216"
              onChange={handelPhone}
            />
            <label>Phone Number</label>
          </div>

          <div className="input">
            <input
              type="text"
              id="mf"
              placeholder="XXXXXXXXX"
              onChange={handelMf}
            />
            <label>Matricule Fiscale</label>
          </div>

          <div className="btnk-auth-cont">
            <button onClick={handelBack1}>Back</button>
            <button onClick={handelSubmit}>Create</button>
          </div>
        </>
      )}
    </div>
  );
};
export default Register;
