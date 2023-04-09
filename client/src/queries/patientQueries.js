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

export { GET_PATIENTS };
