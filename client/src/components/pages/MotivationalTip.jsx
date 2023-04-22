import "../styles/components.scss";
import { useQuery, useMutation } from "@apollo/client";
import motivation from "../assets/motivation.png";
import Spinner from "../elements/Spinner";
import { GET_PATIENTS } from "../../queries/patientQueries";
import { UPDATE_PATIENT } from "../../mutations/patientMutations";
import { useState } from "react";

export default function MotivationalTip() {
  const { loading, error, data } = useQuery(GET_PATIENTS);
  const [allPatients, setAllPatients] = useState(true);
  const [id, setPatientId] = useState("");
  const [motivationalTip, setMotivationalTip] = useState("");
  const [cont, setCont] = useState(0);
  const [updatePatient] = useMutation(UPDATE_PATIENT, {
    //variables: { id, motivationalTip },
    onCompleted: () => {
      if (!allPatients) {
        setPatientId("");
        setMotivationalTip("");
        return alert("Your alert was successfully sent");
      } else {
        setCont(cont + 1);
        console.log("cont", cont);
        if (cont === data.patients.length - 1) {
          setCont(0);
          setMotivationalTip("");
          return alert("Your alert was successfully sent");
        }
      }
    },
  });

  const handleChange = () => {
    setAllPatients(!allPatients);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  //Send motivational tip
  const submitHandler = (e) => {
    e.preventDefault();
    if (motivationalTip === "") {
      return alert("Please write a motivational tip");
    }
    if (!allPatients && id === "") {
      return alert("Please select a patient");
    }
    if (allPatients) {
      console.log("data.patients", data.patients);
      data.patients.forEach((patient) => {
        updatePatient({
          variables: { id: patient.id, motivationalTip: motivationalTip },
        });
      });
    } else {
      updatePatient(id, motivationalTip);
    }
  };

  return (
    <>
      {!loading && !error && data.patients.length > 0 && (
        <section className="wrapper wp-bgw">
          <div className="dir-col center">
            <div className="dir-row">
              <img
                src={motivation}
                alt="Patient List Logo"
                className="mr-2 logo-big"
              />
              <h1>Motivational Tip</h1>
            </div>
          </div>
          <div className="dir-col motivational-content">
            <div className="dir-row">
              <input
                type="checkbox"
                name="allPatients"
                id="allPatients"
                className="form-check-input"
                checked={allPatients}
                onChange={handleChange}
              />
              <label htmlFor="allPatients">Send to all patients</label>
            </div>
            {!allPatients && (
              <select
                className="form-select"
                aria-label="Default select example"
                value={id}
                onChange={(e) => setPatientId(e.target.value)}
              >
                <option value="">Select Patient ID</option>
                {data.patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            )}
            <div className="dir-col">
              <label htmlFor="motivationalTip">Write a motivational tip:</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter Motivational Tip"
                value={motivationalTip}
                onChange={(e) => setMotivationalTip(e.target.value)}
              ></textarea>
            </div>
            <div className="dir-row">
              <button className="btn btn-primary" onClick={submitHandler}>
                Submit
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
