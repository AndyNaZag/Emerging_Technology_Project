import "../styles/components.scss";
import { FaTrash, FaUser } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import Spinner from "../elements/Spinner";
import bell from "../assets/bell.png";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import { GET_PATIENT } from "../../queries/patientQueries";

export default function Notifications({ alerts }) {
  const authContext = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_PATIENT, {
    variables: { id: authContext.userId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <section className="wrapper wp-bgw">
      <div className="dir-row">
        <img src={bell} alt="Patient List Logo" className="mr-2 logo-big" />
        <h1>NURSE NOTIFICATION</h1>
      </div>
      {!data.loading && !data.error && (
        <>
          <div className="dir-col center notification">
            <h5>
              Your nurse, {data.patient.nurse.name}, wants to inform you the
              following information:{" "}
            </h5>
            <h6>
              {data.patient.alertMsg
                ? data.patient.alertMsg
                : "Currently, you do not have any notifications from your nurse."}
            </h6>
          </div>
        </>
      )}
    </section>
  );
}
