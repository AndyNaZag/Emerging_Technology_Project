import React from "react";
import "../styles/components.scss";
import logo from "./../assets/medicalapp.png";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../mutations/authMutations";
import { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import { Link } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("PATIENT");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN, {
    variables: { role, username, password },
    onCompleted: (data) => {
      authContext.login(data.login.token, data.login.role, data.login.userId);
    },
    onError: (err) => {
      console.log(err);
      alert(`Error: ${err.message}`);
    },
  });

  const authContext = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(role, username, password);

    if (username === "" || password === "") {
      return alert("Please fill in all fields");
    }

    login(role, username, password);

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <div className="wrapper">
        <form action="" className="form-login" onSubmit={submitHandler}>
          <img src={logo} alt="logo" className="mr-2" />
          <h3>
            <b className="rto">MedApp LogIn</b>
          </h3>
          <div className="form-group">
            <label htmlFor="role">User role:</label>
            <select
              type="text"
              id="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="PATIENT">Patient</option>
              <option value="NURSE">Nurse</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <p>
              Not registered yet? <Link to="/register">Register here</Link>
            </p>
            <button type="submit" className="btn btn-primary">
              LogIn
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
