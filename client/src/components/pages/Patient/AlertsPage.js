import "../../styles/components.scss";
import { useMutation, useQuery } from "@apollo/client";
import alertIcon from "../../assets/alert-msg-white.png";
import { GET_ALERTS } from "../../../queries/alertQueries";
import { CREATE_ALERT } from "../../../mutations/alertMutations";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";
import { GET_PATIENT } from "../../../queries/patientQueries";
import patientPortal from "../../assets/Alert12.png";
export default function AlertsPage({ alerts }) {
  const [message, setMessage] = useState("");
  const [alertCreated, setAlertCreated] = useState(false);
  const authContext = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_PATIENT, {
    variables: { id: authContext.userId },
  });

  const [createAlert] = useMutation(CREATE_ALERT, {
    onCompleted: () => {
      setMessage("");
      setAlertCreated(true);
    },
    refetchQueries: [{ query: GET_ALERTS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAlert({ variables: { patientId: data.patient.id, message } });
  };
  useEffect(() => {
    if (alertCreated) {
      const timeoutId = setTimeout(() => {
        setAlertCreated(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [alertCreated]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="wrapper wp-bgw">
      <div className="nurse-portal-content">
        <div className="dir-col center">
        <img
                src={patientPortal}
                alt="Patient Vitals"
                className="img-fluid d-block mx-auto mb-4"
                style={{ width: "125px", height: "125px" }}
              />
          <h1>ALERT MESSAGES</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-4">
            <label htmlFor="message">Tell us your emergency in details :</label>
            <input
              type="text"
              className="form-control mt-4"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="center dir-col">
          <button type="submit" className="btn btn-primary mt-4  center">
            Create Alert
          </button>
            <div className="patient-portal-control1 mt-4">
          {alertCreated && (
            <div className="alert alert-success" role="alert">
              Alert created successfully!
            </div>
          )}
          </div>
          </div>
          
        </form>
      </div>
    </section>
  );
}
