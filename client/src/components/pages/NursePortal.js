import "../styles/components.scss";
import { useQuery } from "@apollo/client";
import nursePortal from "../assets/nurse-portal1.png";
import Spinner from "../elements/Spinner";
import AuthContext from "../context/authContext";
import { useContext } from "react";
import { GET_SINGLE_NURSE } from "../../queries/nurseQueries";

const NursePortal = () => {
  const authContext = useContext(AuthContext);
  const nurseId = authContext.userId;
  const { loading, error, data } = useQuery(GET_SINGLE_NURSE, {
    variables: { nurseId },
  });
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data.nurse) return <p>No nurse found</p>;


  const { name } = data.nurse;


  return (
    <section className="wrapper wp-bgw ">
      <div className="patient-portal-content">
        <div className="dir-col center">
          <div className="dir-row">
            <img
              src={nursePortal}
              alt="Nurse List Logo"
              className="mr-2 logo-big"
            />
            <h1>NURSE PORTAL</h1>
          </div>
          <div className="motivational-tip">
            <div className="dir-row">
              <h3>Hi, {name}!</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NursePortal;
