import React from "react";
import logo from "./../assets/medicalapp.png";
import AuthContext from "../context/authContext";
import { useContext } from "react";
import { GET_ALERTS } from "../../queries/alertQueries";
//import { GET_PATIENT } from "../../queries/patientQueries";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Spinner from "../elements/Spinner";

export default function Header() {
  const authContext = useContext(AuthContext);
  const alerts = useQuery(GET_ALERTS);
  // const patient = useQuery(GET_PATIENT, {
  //   variables: { id: authContext.userId },
  // });

  const logout = () => {
    authContext.logout();
  };

  if (alerts.loading) return <Spinner />;
  if (alerts.error) return <p>Error: Something went wrong</p>;

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>MedApp</div>
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {authContext.token && (
            <>
              <ul className="navbar-nav mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <a className="nav-link" href="/">
                    Hi, Welcome to the {authContext.role} panel.
                  </a>
                </li> */}
                {authContext.role === "Nurse" && alerts.data && (
                  <li className="nav-item">
                    <Link className="nav-link alert-page" to="/alerts">
                      Alerts
                      <span className="alert-circle">
                        {alerts.data.emergencyAlerts.length}
                      </span>
                    </Link>
                  </li>
                )}
                {authContext.role === "Patient" && (
                  <li className="nav-item">
                    <Link className="nav-link alert-page" to="/notifications">
                      Notifications
                      <span className="alert-circle">!</span>
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
