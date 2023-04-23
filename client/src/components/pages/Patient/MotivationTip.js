import { useQuery } from "@apollo/client";
import { GET_MOTIVATIONAL_TIPS } from "../../../mutations/motivationMutation";
import Spinner from "../../elements/Spinner";
import patientPortal from "../../assets/Motivate.png";
function MotivationalTips() {
  const { loading, error, data } = useQuery(GET_MOTIVATIONAL_TIPS);

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  const lastTip = data.motivationalTips.slice(-1)[0]; // get the last tip from the array

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
          <h1>MOTIVATIONAL TIPS</h1>
         
        </div>
        {!data.loading && !data.error && (
          <div className="tip-row mt-4">
            <div className="tip-content mt-4">
              <p>{lastTip.tip}</p>
              <small>- {lastTip.nurseName}</small>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MotivationalTips;