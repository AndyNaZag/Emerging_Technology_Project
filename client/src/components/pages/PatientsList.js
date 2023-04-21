import React from "react";
import patientList from "../assets/patient-list.png";
import Patients from "../sections/Patients";

const PatientsList = () => (
    <section className="wrapper wp-bgw ">
    <div className="patient-portal-content">
  <div className="dir-col">
    <div className="dir-row center">
      {/* <img src={patientList} alt="Patient List Logo" className="mr-2 logo-small" /> */}
      <h3>List of Patients</h3>
    </div>
    <Patients />
  </div>
  </div>
  </section>
);

export default PatientsList;
