import React from "react";
import "../styles/components.scss";
import logo from "./../assets/add_user.png";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { CREATE_PATIENT } from "../../mutations/patientMutations";
import { GET_NURSES } from "../../queries/nurseQueries";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState("");
  const [weight, setWeight] = useState(0);
  const motivationalTip =
    "It is never too late to start taking care of your body, welcome to MedApp"; //Motivational tip by default when a patient registers
  const [nurseId, setNurseId] = useState("");
  const [register] = useMutation(CREATE_PATIENT, {
    variables: {
      name,
      username,
      password,
      gender,
      age,
      temperature,
      heartRate,
      bloodPressure,
      weight,
      motivationalTip,
      nurseId,
    },
    onCompleted: (data) => {
      console.log(data);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      alert(`Error: ${error.message}`);
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
      name,
      username,
      password,
      gender,
      age,
      temperature,
      heartRate,
      bloodPressure,
      weight,
      motivationalTip,
      nurseId
    );

    if (
      username === "" ||
      password === "" ||
      name === "" ||
      gender === "" ||
      age === "" ||
      temperature === "" ||
      heartRate === "" ||
      bloodPressure === "" ||
      weight === "" ||
      nurseId === ""
    ) {
      return alert("Please fill in all fields");
    }

    register(
      name,
      username,
      password,
      gender,
      age,
      temperature,
      heartRate,
      bloodPressure,
      weight,
      motivationalTip,
      nurseId
    );

    setUsername("");
    setPassword("");
    setName("");
    setAge(0);
    setTemperature(0);
    setHeartRate(0);
    setBloodPressure("");
    setWeight(0);
    setNurseId("");
  };

  const { loading, error, data } = useQuery(GET_NURSES);

  return (
    <>
      <div className="wrapper wp-bgw">
        <form action="" className="form register-form" onSubmit={submitHandler}>
          <img src={logo} alt="logo" className="mr-2 logo-register" />
          <h2>
            <b className="rto">Welcome to MedApp</b>
          </h2>
          <h6>
            Register and become a patient of the #1 Medical Application in
            Canada. We are here to help you take care of your health.
          </h6>
          <div className="form-group">
            <label htmlFor="name">Full name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
          <div className="form-group">
            <label htmlFor="username">Gender:</label>
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              placeholder="Enter age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="temperature">Temperature (°C):</label>
            <input
              type="number"
              id="temperature"
              placeholder="Enter temperature in Celsius"
              className="form-control"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="heartRate">Heart Rate:</label>
            <input
              type="number"
              id="heartRate"
              placeholder="Enter heart rate"
              className="form-control"
              value={heartRate}
              onChange={(e) => setHeartRate(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bloodPressure">Blood Pressure:</label>
            <input
              type="text"
              id="bloodPressure"
              placeholder="Enter blood pressure"
              className="form-control"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (Kg):</label>
            <input
              type="text"
              id="weight"
              placeholder="Enter weight ing Kg"
              className="form-control"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nurseId">Nurse ID:</label>
            {data && (
              <select
                className="form-select"
                aria-label="Default select example"
                value={nurseId}
                onChange={(e) => setNurseId(e.target.value)}
              >
                <option value="">Select Nurse ID</option>
                {data.nurses.map((nurse) => (
                  <option key={nurse.id} value={nurse.id}>
                    {nurse.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
