import { gql } from "@apollo/client";

const GET_ALERTS = gql`
  query emergencyAlerts {
    emergencyAlerts {
      id
      message
      patient {
        id
        name
      }
    }
  }
`;

export { GET_ALERTS };
