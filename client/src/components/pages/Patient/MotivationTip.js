import { useQuery } from "@apollo/client";
import { GET_MOTIVATIONAL_TIPS } from "../../../mutations/motivationMutation";
import Spinner from "../../elements/Spinner";

function MotivationalTips() {
  const { loading, error, data } = useQuery(GET_MOTIVATIONAL_TIPS);

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  const lastTip = data.motivationalTips.slice(-1)[0]; // get the last tip from the array

  return (
    <section className="wrapper wp-bgw">
      <div className="nurse-portal-content">
        <div className="dir-row center">
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