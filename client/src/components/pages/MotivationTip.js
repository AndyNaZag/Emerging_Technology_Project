import "../styles/components.scss";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import motivation from "../assets/motivation.png";
import Spinner from "../elements/Spinner";
import { GET_PATIENT } from "../../queries/patientQueries";

export default function MotivationTip() {
  const authContext = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_PATIENT, {
    variables: { id: authContext.userId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <section className="wrapper wp-bgw ">
      <div className="patient-portal-content">
        <div className="dir-col center">
          <div className="dir-row">
          <img src={motivation} alt="Motivation Tip"className="img-fluid d-block mx-auto mb-4"
  style={{ width: '128px', height: '128px' }}
/>

          </div>
          <div className="dir-col">
            <h6>Never forget:</h6>
            <p>"{data.patient.motivationalTip}".</p>
          </div>
        </div>
      </div>
    </section>
  );
}
