import "../styles/components.scss";
import { useQuery, useMutation } from "@apollo/client";
import Patients from "../sections/Patients";
import nursePortal from "../assets/nurse-portal1.png";
import patientList from "../assets/patient-list.png";
import Spinner from "../elements/Spinner";
import { GET_PATIENTS } from "../../queries/patientQueries";
import { UPDATE_PATIENT } from "../../mutations/patientMutations";
import { useState } from "react";

export default function MotivationalTip() {
  const { loading, error, data } = useQuery(GET_PATIENTS);
  const [allPatients, setAllPatients] = useState(true);
  const [id, setPatientId] = useState("");
  const [motivationalTip, setMotivationalTip] = useState("");
  const [updatePatient] = useMutation(UPDATE_PATIENT, {
    variables: { id, motivationalTip },
    onCompleted: () => {
      setMotivationalTip("");
      return alert("Your alert was successfully sent");
    },
  });

  const handleChange = () => {
    setAllPatients(!allPatients);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <>
      <section className="wrapper wp-bgw">
        <div className="dir-col center">
          <div className="dir-row">
            <img
              src={nursePortal}
              alt="Patient List Logo"
              className="mr-2 logo-big"
            />
            <h1>Motivational Tip</h1>
          </div>
        </div>
        <div className="dir-col">
          <div className="dir-row">
            <input
              type="checkbox"
              name="allPatients"
              id="allPatients"
              className="brn-check"
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
            ></textarea>
          </div>
          <div className="dir-row">
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </section>
    </>
  );
}
