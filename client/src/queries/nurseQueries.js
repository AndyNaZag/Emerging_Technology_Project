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

export { GET_NURSES };
