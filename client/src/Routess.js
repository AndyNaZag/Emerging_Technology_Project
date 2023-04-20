import React from "react";
import { Route, Routes } from "react-router-dom";
import PatientHome from "./components/pages/PatientPortal";
import Vitals from "./components/pages/Vitals";
import MotivationTip from "./components/pages/MotivationTip";
import SymptomsCheck from "./components/pages/SymptomsCheck";

const Routess = ({ role }) => {
  return (
    <Routes>
      {role === "patient" && (
        <>
          <Route path="/" element={<PatientHome />} />
          <Route path="/vitals" element={<Vitals />} />
          <Route path="/motivation-tip" element={<MotivationTip />} />
          <Route path="/symptoms-check" element={<SymptomsCheck />} />
        </>
      )}
    </Routes>
  );
};

export default Routess;
