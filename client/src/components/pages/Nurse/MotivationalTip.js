import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_MOTIVATION, GET_MOTIVATIONAL_TIPS} from "../../../mutations/motivationMutation";

function MotivationalTips() {
  const [tip, setTip] = useState("");
  const [nurseId, setNurseId] = useState("");

  // Mutation to add a new motivational tip
  const [addMotivationalTip] = useMutation(CREATE_MOTIVATION);

  const handleSubmit = (e) => {
    e.preventDefault();
    addMotivationalTip({
      variables: { tip: tip, nurse: nurseId },
      refetchQueries: [{ query: GET_MOTIVATIONAL_TIPS, variables: { nurseId: nurseId } }],
    }).then(() => {
      setTip("");
    });
  };

  // Query to get motivational tips for a particular nurse
  const { loading, error, data } = useQuery(GET_MOTIVATIONAL_TIPS, {
    variables: { nurse: nurseId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Add a motivational tip:
          <input type="text" value={tip} onChange={(e) => setTip(e.target.value)} />
        </label>
        <label>
          Nurse ID:
          <input type="text" value={nurseId} onChange={(e) => setNurseId(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <h2>Motivational Tips</h2>
      <ul>
        {data.motivationalTips.map((tip) => (
          <li key={tip._id}>
            {tip.tip} - {tip.nurse}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MotivationalTips;
