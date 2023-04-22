import React from "react";
import "../styles/components.scss";
import { FaTrash, FaUser } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import Spinner from "../elements/Spinner";
import alertIcon from "../assets/alert-msg.png";
import { GET_ALERTS } from "../../queries/alertQueries";
import { DELETE_ALERT } from "../../mutations/alertMutations";
import { useState } from "react";

export default function Alerts({ alerts }) {
  const { loading, error, data } = useQuery(GET_ALERTS);
  const [id, setId] = useState(null);

  const removeAlert = (id) => {
    setId(id);
    console.log(id);
    deleteEmergencyAlert();
  };

  const [deleteEmergencyAlert] = useMutation(DELETE_ALERT, {
    variables: { id },
    onCompleted: () => {
      window.location.reload();
    },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <section className="wrapper wp-bgw">
      <div className="dir-row">
        <img
          src={alertIcon}
          alt="Patient List Logo"
          className="mr-2 logo-big"
        />
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
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        removeAlert(alert.id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
