import "../styles/components.scss";
import { useQuery } from "@apollo/client";
import Patients from "./Patients";
import patientList from "../assets/patient-list.png";
import Spinner from "../elements/Spinner";
import { GET_PATIENTS } from "../../queries/patientQueries";

export default function Home() {
  const { loading, error, data } = useQuery(GET_PATIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <>
      <section className="wrapper wp-bgw">
        <div className="dir-col">
          <div className="dir-row">
            <img
              src={patientList}
              alt="Patient List Logo"
              className="mr-2 logo-big"
            />
            <h1>List of Patients</h1>
          </div>
          <Patients />
        </div>
      </section>
    </>
  );
}
