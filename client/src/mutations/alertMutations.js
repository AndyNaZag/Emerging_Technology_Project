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

const DELETE_ALERT = gql`
  mutation DeleteEmergencyAlert($id: ID!) {
    deleteEmergencyAlert(id: $id) {
      id
      patient {
        id
        name
      }
      message
    }
  }
`;

export { CREATE_ALERT, DELETE_ALERT };
