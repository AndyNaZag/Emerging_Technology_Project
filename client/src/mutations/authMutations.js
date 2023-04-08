import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($role: Role!, $username: String!, $password: String!) {
    login(role: $role, username: $username, password: $password) {
      role
      userId
      token
      tokenExpiration
    }
  }
`;

export { LOGIN };
