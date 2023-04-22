import "../../styles/components.scss";
import { FaTrash, FaUser } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import Spinner from "../../elements/Spinner";
import alertIcon from "../../assets/alert-msg-white.png";
import { GET_ALERTS } from "../../../queries/alertQueries";
import { DELETE_ALERT } from "../../../mutations/alertMutations";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Alerts({ alerts }) {
  const { loading, error, data } = useQuery(GET_ALERTS);
  const [id, setId] = useState(null);

  const handleAlertDelete = (id) => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to attend to this patient?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteEmergencyAlert({ variables: { id } });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  
  const [deleteEmergencyAlert] = useMutation(DELETE_ALERT, {
    onCompleted: () => {
      window.location.reload();
    },
  });
  

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <section className="wrapper wp-bgw">
      <div className="nurse-portal-content">
        <div className="dir-row center">
          {/* <img
            src={alertIcon}
            alt="Patient List Logo"
            className="mr-2 logo-big"
          /> */}
          <h1>ALERT MESSAGES</h1>
        </div>
        {!data.loading && !data.error && (
          <>
            <table className="table table-hover mt-3">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.emergencyAlerts.map((alert) => (
                  <tr className="patient-row" key={alert.id}>
                    <td>
                      <FaUser className="icon" />
                      {alert.patient.name}
                    </td>
                    <td>{alert.message}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          handleAlertDelete(alert.id);
                        }}
                      >
                        Check
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
}
