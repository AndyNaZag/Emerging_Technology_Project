import { gql } from "@apollo/client";

const CREATE_PATIENT = gql`
  mutation CreatePatient(
    $name: String!
    $username: String!
    $password: String!
    $gender: String!
    $age: Int!
    $temperature: Int!
    $heartRate: Int!
    $bloodPressure: String!
    $weight: Int!
    $motivationalTip: String!
    $alertMsg: String
    $fever: Boolean
    $chestPain: Boolean
    $difficultyBreathing: Boolean
    $symptoms: String
    $nurseId: ID!
  ) {
    createPatient(
      name: $name
      username: $username
      password: $password
      gender: $gender
      age: $age
      temperature: $temperature
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      weight: $weight
      motivationalTip: $motivationalTip
      alertMsg: $alertMsg
      fever: $fever
      chestPain: $chestPain
      difficultyBreathing: $difficultyBreathing
      symptoms: $symptoms
      nurseId: $nurseId
    ) {
      id
      name
      username
      password
      gender
      age
      temperature
      heartRate
      bloodPressure
      weight
      motivationalTip
      alertMsg
      fever
      chestPain
      difficultyBreathing
      symptoms
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
    $gender: String
    $age: Int
    $temperature: Int
    $heartRate: Int
    $bloodPressure: String
    $weight: Int
    $motivationalTip: String
    $alertMsg: String
    $fever: Boolean
    $chestPain: Boolean
    $difficultyBreathing: Boolean
    $symptoms: String
    $nurseId: ID
  ) {
    updatePatient(
      id: $id
      password: $password
      gender: $gender
      age: $age
      temperature: $temperature
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      weight: $weight
      motivationalTip: $motivationalTip
      alertMsg: $alertMsg
      fever: $fever
      chestPain: $chestPain
      difficultyBreathing: $difficultyBreathing
      symptoms: $symptoms
      nurseId: $nurseId
    ) {
      id
      name
      username
      password
      gender
      age
      temperature
      heartRate
      bloodPressure
      weight
      motivationalTip
      alertMsg
      fever
      chestPain
      difficultyBreathing
      symptoms
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
      gender
      age
      password
      temperature
      heartRate
      bloodPressure
      weight
      motivationalTip
      alertMsg
      fever
      chestPain
      difficultyBreathing
      symptoms
    }
  }
`;

export { CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT };
