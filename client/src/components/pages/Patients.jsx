import { useQuery } from "@apollo/client";
import PatientRow from "../elements/PatientRow";
import Spinner from "../elements/Spinner";
import { GET_PATIENTS } from "../../queries/patientQueries";

export default function Patients() {
  const { loading, error, data } = useQuery(GET_PATIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
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
            {data.patients.map((patient) => (
              <PatientRow key={patient.id} patient={patient} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
