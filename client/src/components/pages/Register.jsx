import "../styles/components.scss";
import logo from "./../assets/medicalapp.png";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_PATIENT } from "../../mutations/patientMutations";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_NURSES } from "../../queries/nurseQueries";

export default function Register() {

  const { loading, error, data } = useQuery(GET_NURSES);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState("");
  const [weight, setWeight] = useState(0);

  const motivationalTip =
    "It is never too late to start taking care of your body, welcome to CheckupApp"; //Motivational tip by default when a patient registers
  
    const [nurseId, setNurseId] = useState("");
    

  const [register] = useMutation(CREATE_PATIENT, {
    variables: {
      name,
      username,
      password,
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
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(
      name,
      username,
      password,
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
    setTemperature(0);
    setHeartRate(0);
    setBloodPressure("");
    setWeight(0);
    setNurseId("");
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const nurses = data.nurses;
  return (
    <>
      <div className="wrapper wp-bgw">
      <div className="patient-portal-content">
        <form action="" className="form" onSubmit={submitHandler}>
         
          <h2>
            <b className="rto center">Welcome to CheckupApp</b>
          </h2>
          <h4>
            <b className="rto center mt-2">
              Register and become a patient of the #1 Healthcare Plan in Canada
            </b>
          </h4>
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
              <label htmlFor="nurseId">Nurse:</label>
              <select
                id="nurseId"
                className="form-control"
                value={nurseId}
                onChange={(e) => setNurseId(e.target.value)}
              >
                <option value="">Select a nurse</option>
                {nurses.map((nurse) => (
                  <option key={nurse.id} value={nurse.id}>
                    {nurse.name}
                  </option>
                ))}
              </select>
            </div>
          <div className="form-actions center mt-5">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}
