import "../styles/components.scss";
import { FaTrash, FaUser } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Spinner from "../elements/Spinner";
import { GET_PATIENTS } from "../../queries/patientQueries";
import { GET_NURSES } from "../../queries/nurseQueries";
import {
  DELETE_PATIENT,
  UPDATE_PATIENT,
} from "../../mutations/patientMutations";

export default function Patients() {
  const [patient, setPatient] = useState("");
  const [id, setPatientId] = useState("");
  const [temperature, setTemperature] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [weight, setWeight] = useState("");
  const [nurseId, setNurseId] = useState("");

  const [updatePatient] = useMutation(UPDATE_PATIENT, {
    variables: {
      id,
      temperature,
      heartRate,
      bloodPressure,
      weight,
      nurseId,
    },
    onCompleted: () => {
      return alert("Patient was successfully updated");
    },
  });

  const onPatientClick = (patient) => {
    setPatient(patient);
    setPatientId(patient.id);
    setTemperature(patient.temperature);
    setHeartRate(patient.heartRate);
    setBloodPressure(patient.bloodPressure);
    setWeight(patient.weight);
    setNurseId(patient.nurse.id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!temperature || !heartRate || !bloodPressure || !weight || !nurseId) {
      return alert("Please fill in all fields");
    }
    updatePatient(id, temperature, heartRate, bloodPressure, weight, nurseId);
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

  //const { loading, error, data } = useQuery(GET_PATIENTS);
  const nurses = useQuery(GET_NURSES);
  const patients = useQuery(GET_PATIENTS);
  if (patients.loading || nurses.loading) return <Spinner />;
  if (patients.error || nurses.error) return <p>Error: Something went wrong</p>;

  return (
    <>
      {!patients.loading && !patients.error && (
        <>
          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Temperature</th>
                <th>Heart Rate</th>
                <th>Blood Pressure</th>
                <th>Weight</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.data.patients.map((patient) => (
                <tr
                  className="patient-row"
                  data-bs-toggle="modal"
                  data-bs-target="#updatePatientModal"
                  key={patient.id}
                  onClick={() => {
                    onPatientClick(patient);
                  }}
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
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setPatient(patient);
                        deletePatient();
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <>
            {!nurses.loading && !nurses.error && (
              <>
                <div
                  className="modal fade"
                  id="updatePatientModal"
                  aria-labelledby="updatePatientModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id="updatePatientModalLabel"
                        >
                          Update Patient Information
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={onSubmit}>
                          <div className="mb-3">
                            <label className="form-label">Temperature:</label>
                            <input
                              type="number"
                              className="form-control"
                              id="temperature"
                              value={temperature}
                              onChange={(e) =>
                                setTemperature(parseInt(e.target.value))
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Heart Rate:</label>
                            <input
                              type="number"
                              className="form-control"
                              id="heartRate"
                              value={heartRate}
                              onChange={(e) =>
                                setHeartRate(parseInt(e.target.value))
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Blood Pressure</label>
                            <input
                              type="text"
                              className="form-control"
                              id="bloodPressure"
                              value={bloodPressure}
                              onChange={(e) => setBloodPressure(e.target.value)}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Weight</label>
                            <input
                              type="number"
                              className="form-control"
                              id="weight"
                              value={weight}
                              onChange={(e) =>
                                setWeight(parseInt(e.target.value))
                              }
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Nurse ID</label>
                            {patient && (
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                value={nurseId}
                                onChange={(e) => setNurseId(e.target.value)}
                              >
                                <option value="">Select Nurse ID</option>
                                {nurses.data.nurses.map((nurse) => (
                                  <option key={nurse.id} value={nurse.id}>
                                    {nurse.name}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                          <button
                            type="submit"
                            data-bs-dismiss="modal"
                            className="btn btn-secondary"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        </>
      )}
    </>
  );
}
