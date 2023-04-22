import { useQuery } from "@apollo/client";
import { GET_MOTIVATIONAL_TIPS } from "../../../mutations/motivationMutation";
import Spinner from "../../elements/Spinner";

function MotivationalTips() {
  const { loading, error, data } = useQuery(GET_MOTIVATIONAL_TIPS);

  if (loading) return <Spinner />;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <section className="wrapper wp-bgw">
      <div className="nurse-portal-content">
        <div className="dir-row center">
          <h1>MOTIVATIONAL TIPS</h1>
        </div>
        {!data.loading && !data.error && (
          <ul className="list-unstyled mt-3">
            {data.motivationalTips.map((tip) => (
              <li className="tip-row" key={tip.id}>
                <div className="tip-content">
                  <p>{tip.tip}</p>
                  <small>by {tip.nurseName}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default MotivationalTips;
