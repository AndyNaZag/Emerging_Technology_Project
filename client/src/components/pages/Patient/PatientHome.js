import "../styles/components.scss";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import patientPortal from "../assets/patient-portal.png";
import Spinner from "../elements/Spinner";
import { GET_PATIENT } from "../../queries/patientQueries";

export default function PatientHome() {
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
            <img
              src={patientPortal}
              alt="Patient List Logo"
              className="mr-2 logo-big"
            />
            <h1>PATIENT PORTAL</h1>
          </div>
          <div className="motivational-tip">
            <div className="dir-row">
              <h3>Hi, {data.patient.name}!</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
