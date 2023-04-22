import { useQuery } from "@apollo/client";
import { GET_MOTIVATIONAL_TIPS } from "../../../mutations/motivationMutation";

function MotivationalTips() {
  const { loading, error, data } = useQuery(GET_MOTIVATIONAL_TIPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h2>Motivational Tips</h2>
      <ul>
        {data.motivationalTips.map((tip) => (
          <li key={tip.id}>
            {tip.tip} - {tip.nurse.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MotivationalTips;
