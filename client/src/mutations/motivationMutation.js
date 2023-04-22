import { gql } from "@apollo/client";

const CREATE_MOTIVATION = gql`
  mutation addMotivationalTip($tip: String!, $nurse: ID!) {
    addMotivationalTip(tip: $tip, nurse: $nurse) {
      _id
      tip
      nurse {
        _id
        name
      }
    }
  }
`;

const GET_MOTIVATIONAL_TIPS = gql`
  query motivationalTips($nurseId: ID!) {
    motivationalTips(nurseId: $nurseId) {
      tip
      nurse
    }
  }
`;
;

export { CREATE_MOTIVATION, GET_MOTIVATIONAL_TIPS };
