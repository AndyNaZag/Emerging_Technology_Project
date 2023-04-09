import "../styles/components.scss";
import { FaTrash, FaUser } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  DELETE_PATIENT,
  UPDATE_PATIENT,
} from "../../mutations/patientMutations";
import Spinner from "../elements/Spinner";
import { GET_PATIENTS } from "../../queries/patientQueries";
import { GET_NURSES } from "../../queries/nurseQueries";

export default function PatientRow({ patient }) {
  console.log("patient: ", patient);
  const [temperature, setTemperature] = useState(patient.temperature);
  const [heartRate, setHeartRate] = useState(patient.heartRate);
  const [bloodPressure, setBloodPressure] = useState(patient.bloodPressure);
  const [weight, setWeight] = useState(patient.weight);
  const [nurseId, setNurseId] = useState(patient.nurse.id);

  const [updatePatient] = useMutation(UPDATE_PATIENT, {
    variables: { temperature, heartRate, bloodPressure, weight, nurseId },
    update(cache, { data: { createPatient } }) {
      const { patients } = cache.readQuery({ query: GET_PATIENTS });
      cache.writeQuery({
        query: GET_PATIENTS,
        data: { patients: [...patients, createPatient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!temperature || !heartRate || !bloodPressure || !weight || !nurseId) {
      return alert("Please fill in all fields");
    }
    updatePatient(temperature, heartRate, bloodPressure, weight, nurseId);
    setTemperature("");
    setHeartRate("");
    setBloodPressure("");
    setWeight("");
    setNurseId("");
  };

  const [deletePatient] = useMutation(DELETE_PATIENT, {
    variables: { id: patient.id },
    update(cache, { data: { deletePatient } }) {
      const { patients } = cache.readQuery({ query: GET_PATIENTS });
      cache.writeQuery({
        query: GET_PATIENTS,
        data: {
          patients: patients.filter((p) => p.id !== deletePatient.id),
        },
      });
    },
  });

  // Get Nurses for select
  const { loading, error, data } = useQuery(GET_NURSES);
  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <tr
      className="patient-row"
      data-bs-toggle="modal"
      data-bs-target="#updatePatientModal"
    >
      <td>
        <FaUser className="icon" />
        {patient.name}
      </td>
      <td>{patient.temperature}</td>
      <td>{patient.heartRate}</td>
      <td>{patient.bloodPressure}</td>
      <td>{patient.weight}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deletePatient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
