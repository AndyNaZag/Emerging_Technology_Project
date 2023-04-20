import "../styles/components.scss";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import patientPortal from "../assets/patient-portal.png";
import Spinner from "../elements/Spinner";
import { GET_PATIENT } from "../../queries/patientQueries";
import AlertMessage from "../sections/alertMessage";
import { UPDATE_PATIENT } from "../../mutations/patientMutations";

export default function Vitals() {
  const authContext = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_PATIENT, {
    variables: { id: authContext.userId },
  });
  const id = authContext.userId;
  const [temperature, setTemperature] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [bloodPressure, setBloodPressure] = useState("");
  const [oxygenLevel, setOxygenLevel] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [updatePatient, { loading: updateLoading, error: updateError }] = useMutation(
    UPDATE_PATIENT
  );

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updatePatient({
      variables: {
        id: id,
        vitalInput: {
          temperature: Number(temperature),
          heartRate: Number(heartRate),
          bloodPressure: bloodPressure,
          oxygenLevel: Number(oxygenLevel),
          height: Number(height),
          weight: Number(weight),
        },
      },
      refetchQueries: [
        {
          query: GET_PATIENT,
          variables: { id: authContext.userId },
        },
      ],
    });
  };

  if (loading) return <Spinner />;
  if (error) return <AlertMessage message={error.message} />;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card border-0 shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Patient Vitals</h2>
              <img
                src={patientPortal}
                alt="Patient Portal"
                className="img-fluid d-block mx-auto mb-4"
              />
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="temperature">Temperature (°F)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="temperature"
                    placeholder="Enter temperature"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="heartRate">Heart Rate (bpm)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="heartRate"
                    placeholder="Enter heart rate"
                    value={heartRate}
                    onChange={(e) => setHeartRate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bloodPressure">Blood Pressure</label>
                  <input
                    type="text"
                    className="form-control"
                    id="bloodPressure"
                    placeholder="Enter blood pressure"
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
  <div className="text-center">
    <button type="submit" className="btn btn-primary">
      Save
    </button>
  </div>
</form>
</div>
</div>
</div>
</div>
</div>
);
} 