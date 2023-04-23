import React from "react";
import patientList from "../../assets/patient-list.png";
import Patients from "../../sections/Patients";
import patientPortal from "../../assets/List12.png";
const PatientsList = () => (
    <section className="wrapper wp-bgw ">
    <div className="patient-portal-content">
  <div className="dir-col">
    <div className="dir-col center">
      {/* <img src={patientList} alt="Patient List Logo" className="mr-2 logo-small" /> */}
      <img
                src={patientPortal}
                alt="Patient Vitals"
                className="img-fluid d-block mx-auto mb-4"
                style={{ width: "100px", height: "100px" }}
              />
      <h3>List of Patients</h3>
     
    </div>
    <Patients />
  </div>
  </div>
  </section>
);

export default PatientsList;
