import { gql } from "@apollo/client";

const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      name
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

const GET_PATIENT = gql`
  query GetPatient($id: ID!) {
    patient(id: $id) {
      id
      name
      temperature
      heartRate
      bloodPressure
      weight
      password
      nurse {
        id
        name
      }
    }
  }
`;

export { GET_PATIENTS, GET_PATIENT };
