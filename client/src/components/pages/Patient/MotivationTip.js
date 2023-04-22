import { useState } from "react";
import "../../styles/components.scss";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import motivation from "../../assets/motivation.png";
import Spinner from "../../elements/Spinner";
import { GET_PATIENT } from "../../../queries/patientQueries";

export default function MotivationTip() {
  const authContext = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_PATIENT, {
    variables: { id: authContext.userId },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedTip, setEditedTip] = useState("");

  const handleEdit = () => {
    setEditedTip(data.patient.motivationalTip);
    setIsEditing(true);
  };

  const handleSave = () => {
    // Call your API to update the motivational tip
    setIsEditing(false);
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <section className="wrapper wp-bgw ">
      <div className="patient-portal-content">
        <div className="dir-col center">
          <div className="dir-row">
            <img
              src={motivation}
              alt="Motivation Tip"
              className="img-fluid d-block mx-auto mb-4"
              style={{ width: "128px", height: "128px" }}
            />
          </div>
          <div className="dir-col">
            <h6>Never forget:</h6>
            {isEditing ? (
              <div>
                <textarea
                  value={editedTip}
                  onChange={(e) => setEditedTip(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <>
                <p>"{data.patient.motivationalTip}".</p>
                {authContext.userType === "Nurse" && (
                  <button onClick={handleEdit}>Edit</button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
