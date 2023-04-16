import "../styles/components.scss";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import motivation from "../assets/motivation.png";
import patientPortal from "../assets/patient-portal.png";
import Spinner from "../elements/Spinner";
import { GET_PATIENT } from "../../queries/patientQueries";
import AlertMessage from "../sections/alertMessage";
import { UPDATE_PATIENT } from "../../mutations/patientMutations";

export default function PatientPortal() {
  const authContext = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_PATIENT, {
    variables: { id: authContext.userId },
  });
  const id = authContext.userId;
  const [temperature, setTemperature] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState("");
  const [weight, setWeight] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [updatePatient] = useMutation(UPDATE_PATIENT, {
    variables: { id, temperature, heartRate, bloodPressure, weight },
    refetchQueries: [{ query: GET_PATIENT, variables: { id: id } }],
  });

  if (!updatePatient.loading && !updatePatient.error && submitted) {
    setSubmitted(false);
    return alert("Your daily information was successfully updated");
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      temperature === "" ||
      heartRate === "" ||
      bloodPressure === "" ||
      weight === ""
    ) {
      return alert("Please fill in all fields");
    }

    updatePatient(id, temperature, heartRate, bloodPressure, weight);
    setSubmitted(true);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;
  if (!loading && !error && !loaded) {
    setTemperature(data.patient.temperature);
    setHeartRate(data.patient.heartRate);
    setBloodPressure(data.patient.bloodPressure);
    setWeight(data.patient.weight);
    setLoaded(true);
  }

  return (
    <>
      {!loading && !error && (
        <section className="wrapper wp-bgw">
          <div className="dir-col center">
            <div className="dir-row">
              <img
                src={patientPortal}
                alt="Patient List Logo"
                className="mr-2 logo-big"
              />
              <h1>PATIENT PORTAL</h1>
            </div>
            <div className="motivational-tip">
              <div className="dir-row">
                <img src={motivation} alt="Motivational Tip" className="mr-2" />
                <h3>Hi, {data.patient.name}!</h3>
              </div>
              <div className="dir-col">
                <h6>Never forget:</h6>
                <p>"{data.patient.motivationalTip}".</p>
              </div>
            </div>
          </div>
          <div className="dir-row patient-portal-content">
            <form action="" className="form dir-col" onSubmit={submitHandler}>
              <h3>DAILY INFORMATION</h3>
              <p>Submit your daily information.</p>
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
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <div className="dir-col">
              <div className="dir-col emergency-alert">
                <AlertMessage id={id} />
              </div>
              <div className="dir-col">
                <h5>
                  CHECKLIST OF COMMON <br /> SIGN AND SYMPTOMS
                </h5>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
