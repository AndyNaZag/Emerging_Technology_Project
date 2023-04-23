import "../../styles/components.scss";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import patientPortal from "../../assets/patient1.png";
import Spinner from "../../elements/Spinner";
import { GET_PATIENT } from "../../../queries/patientQueries";

export default function PatientHome() {
  const authContext = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_PATIENT, {
    variables: { id: authContext.userId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  // Get the current hour of the day
  const now = new Date();
  const hour = now.getHours();

  // Determine the appropriate greeting based on the time of day
  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

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
            <div className="dir-row ">
              <h3>{greeting}, {data.patient.name}!</h3>
            </div>
          </div>
          <div className="dir-row mt-4">
            <p>Welcome to your Patient portal. Here, you can view your update your daily vitals, check your symptoms, and see motivational tips shared by your healthcare provider. To get started, explore the different sections of the portal and don't hesitate to ask your provider if you have any questions.</p>
          </div>
          <div className="dir-col center mt-4 patient-portal-content1">
            <h4>Healthy Living Tips:</h4>

            <ul>
              <li>Eat a balanced diet with plenty of fruits and vegetables.</li>
              <li>Exercise regularly to maintain a healthy weight and reduce your risk of chronic disease.</li>
              <li>Get enough sleep to help your body and mind recover.</li>
              <li>Avoid smoking and limit your alcohol intake.</li>
              <li>Take care of your mental health by practicing stress-reducing activities, such as meditation or yoga.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
