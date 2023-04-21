import "../styles/components.scss";
import { useQuery } from "@apollo/client";
import Patients from "../sections/Patients";
import nursePortal from "../assets/nurse-portal1.png";
import patientList from "../assets/patient-list.png";
import Spinner from "../elements/Spinner";
import { GET_PATIENTS } from "../../queries/patientQueries";
import { useNavigate } from "react-router-dom";

export default function NursePortal() {
  const { loading, error, data } = useQuery(GET_PATIENTS);
  const navigate = useNavigate();

  const onMedicalConditionClick = () => {
    navigate("/medical-condition");
  };

  const onMotivationalTipClick = () => {
    navigate("/motivational-tip");
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
            <h1>NURSE PORTAL</h1>
          </div>
          <div className="dir-row patient-portal-content">
            <div className="dir-col">
              <div className="dir-row">
                {/* <img
                  src={patientList}
                  alt="Patient List Logo"
                  className="mr-2 logo-small"
                /> */}
                <h3>List of Patients</h3>
              </div>
              <Patients />
            </div>
            <div className="dir-col">
              <div className="dir-col">
                <button
                  className="btn btn-warning"
                  onClick={onMotivationalTipClick}
                >
                  <h3>Update Daily Motivational Tip</h3>
                </button>
              </div>
              <div className="dir-col">
                <button
                  className="btn btn-primary"
                  onClick={onMedicalConditionClick}
                >
                  <h3>Generate medical conditions</h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
