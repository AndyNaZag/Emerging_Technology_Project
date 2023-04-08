import { gql } from "@apollo/client";

const LOGIN = gql`
  query Login($role: String!, $username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export { LOGIN };
