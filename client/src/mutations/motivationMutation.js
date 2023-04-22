import { gql } from "@apollo/client";

const CREATE_MOTIVATION = gql`
  mutation addMotivationalTip($tip: String!, $nurse: ID!) {
    addMotivationalTip(tip: $tip, nurse: $nurse) {
      tip
      nurse 
    }
  }
`;


const GET_MOTIVATIONAL_TIPS = gql`
  query motivationalTips{
    motivationalTips {
      tip
      nurseName
    }
  }
`;


export { CREATE_MOTIVATION, GET_MOTIVATIONAL_TIPS };
