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
const GET_SINGLE_NURSE = gql`
  query GetSingleNurse($nurseId: ID!) {
    nurse(id: $nurseId) {
      id
      name
      username
    }
  }
  `;

export { GET_NURSES, GET_SINGLE_NURSE };
