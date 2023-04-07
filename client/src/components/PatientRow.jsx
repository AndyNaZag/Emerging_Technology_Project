import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_PATIENT } from "../mutations/patientMutations";
import { GET_PATIENTS } from "../queries/patientQueries";

export default function PatientRow({ patient }) {
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

  return (
    <tr>
      <td>{patient.name}</td>
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
