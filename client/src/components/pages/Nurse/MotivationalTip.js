import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MOTIVATION, GET_MOTIVATIONAL_TIPS} from "../../../mutations/motivationMutation";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";
import patientPortal from "../../assets/Motivate.png";
export default function MotivationalTip() {
  const [tip, setTip] = useState("");
  const authContext = useContext(AuthContext);
  const [nurse, setNurse] = useState(); // If you want to allow the user to select a nurse
  const [successMessage, setSuccessMessage] = useState("");

  const nurseid = authContext.userId;

  const { loading, error, data } = useQuery(GET_MOTIVATIONAL_TIPS);

  const [createMotivationalTip] = useMutation(CREATE_MOTIVATION, {
    onCompleted: () => {
      setTip("");
      setSuccessMessage("Motivational tip added successfully!");
    },
    refetchQueries: [{ query: GET_MOTIVATIONAL_TIPS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nurseid);
    console.log(authContext.userId);
    console.log(tip);
    createMotivationalTip({ variables: { tip, nurse: nurseid } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="wrapper wp-bgw">
      <div className="nurse-portal-content">
      <div className="dir-col center">
        <img
                src={patientPortal}
                alt="Patient Vitals"
                className="img-fluid d-block mx-auto mb-4"
                style={{ width: "100px", height: "125px" }}
              />
          <h1>Add a Motivational Tip</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mt-4">
            <label htmlFor="tip">Motivational tip:</label>
            <textarea
              className="form-control mt-4"
              id="tip"
              rows="5"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
            ></textarea>
          </div>
          {/* If you want to allow the user to select a nurse, uncomment the following code */}
          {/* <div className="form-group mt-4">
            <label htmlFor="nurse">Select a nurse:</label>
            <select
              className="form-control mt-4"
              id="nurse"
              value={nurse}
              onChange={(e) => setNurse(e.target.value)}
            >
              <option value="">Select a nurse</option>
              {data.nurses.map((nurse) => (
                <option key={nurse._id} value={nurse._id}>
                  {nurse.name}
                </option>
              ))}
            </select>
          </div> */}
          <div className="center dir-col">
            <button type="submit" className="btn btn-primary mt-4  center">
              Add Motivational Tip
            </button>
            {successMessage && (
              <div className="alert alert-success mt-4" role="alert">
                {successMessage}
              </div>
            )}
          </div>
        </form>
              </div>
    </section>
  );
}
