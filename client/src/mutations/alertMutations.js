import { gql } from "@apollo/client";

const CREATE_ALERT = gql`
  mutation CreateAlert($patientId: ID!, $message: String!) {
    createAlert(patientId: $patientId, message: $message) {
      id
      patient {
        id
        name
      }
      message
    }
  }
`;

export { CREATE_ALERT };
