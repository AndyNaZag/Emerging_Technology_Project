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

const UPDATE_PATIENT = gql`
  mutation UpdatePatient(
    $id: ID!
    $password: String
    $temperature: Int
    $heartRate: Int
    $bloodPressure: String
    $weight: Int
    $nurseId: ID
  ) {
    updatePatient(
      id: $id
      password: $password
      temperature: $temperature
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      weight: $weight
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

const UPDATE_PATIENT_SYMPTOMS = gql`
  mutation updatePatientSymptoms(
    $id: ID!
    $fever: Boolean
    $cough: Boolean
    $shortnessOfBreath: Boolean
    $fatigue: Boolean
    $bodyAches: Boolean
    $headache: Boolean
    $lossOfTaste: Boolean
    $soreThroat: Boolean
    $congestion: Boolean
    $nausea: Boolean
    $diarrhea: Boolean
  ) {
    updatePatientSymptoms(
      id: $id
      fever: $fever
      cough: $cough
      shortnessOfBreath: $shortnessOfBreath
      fatigue: $fatigue
      bodyAches: $bodyAches
      headache: $headache
      lossOfTaste: $lossOfTaste
      soreThroat: $soreThroat
      congestion: $congestion
      nausea: $nausea
      diarrhea: $diarrhea
    ) {
      id
      fever
      cough
      shortnessOfBreath
      fatigue
      bodyAches
      headache
      lossOfTaste
      soreThroat
      congestion
      nausea
      diarrhea
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

export { CREATE_PATIENT, UPDATE_PATIENT, UPDATE_PATIENT_SYMPTOMS, DELETE_PATIENT };
