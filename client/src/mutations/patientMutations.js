import { gql } from "@apollo/client";

const ADD_PATIENT = gql`
  mutation AddPatient(
    $name: String!
    $temperature: Float!
    $heartRate: Int!
    $bloodPressure: Int!
    $weight: Int!
  ) {
    addPatient(
      name: $name
      temperature: $temperature
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      weight: $weight
    ) {
      id
      name
      username
      password
      temperature
      heartRate
      bloodPressure
      weight
    }
  }
`;

export { ADD_PATIENT };

const DELETE_PATIENT = gql`
  mutation DeletePatient($id: ID!) {
    deletePatient(id: $id) {
      id
      name
      username
      password
      temperature
      heartRate
      bloodPressure
      weight
    }
  }
`;

export { DELETE_PATIENT };
