import { gql } from "@apollo/client";

const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      name
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

const GET_PATIENT = gql`
  query GetPatient($id: ID!) {
    patient(id: $id) {
      id
      name
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

export { GET_PATIENTS, GET_PATIENT };
