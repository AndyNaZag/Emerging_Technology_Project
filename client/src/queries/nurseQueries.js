import { gql } from "@apollo/client";

const GET_NURSES = gql`
  query GetNurses {
    nurses {
      id
      name
      username
    }
  }
`;

const GET_CURRENT_NURSE = gql`
  query GetCurrentNurse {
    currentNurse {
      id
      name
      username
    }
  }
`;

export { GET_NURSES, GET_CURRENT_NURSE };
