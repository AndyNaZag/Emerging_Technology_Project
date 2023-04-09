import { gql } from "@apollo/client";

const CREATE_PATIENT = gql`
  mutation CreatePatient(
    $name: String!
    $username: String!
    $password: String!
    $temperature: Int!
    $heartRate: Int!
    $bloodPressure: String!
    $weight: Int!
    $motivationalTip: String!
    $nurseId: ID!
  ) {
    createPatient(
      name: $name
      username: $username
      password: $password
      temperature: $temperature
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      weight: $weight
      motivationalTip: $motivationalTip
      nurseId: $nurseId
    ) {
      id
      name
      username
      password
      temperature
      heartRate
      bloodPressure
      weight
      motivationalTip
      nurse {
        id
        name
      }
    }
  }
`;

const UPDATE_PATIENT = gql`
  mutation UpdatePatient(
    $id: ID!
    $password: String
    $temperature: Int
    $heartRate: Int
    $bloodPressure: String
    $weight: Int
    $motivationalTip: String
    $nurseId: ID
  ) {
    updatePatient(
      id: $id
      password: $password
      temperature: $temperature
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      weight: $weight
      motivationalTip: $motivationalTip
      nurseId: $nurseId
    ) {
      id
      name
      username
      password
      temperature
      heartRate
      bloodPressure
      weight
      nurse {
        id
        name
      }
    }
  }
`;

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

export { CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT };
