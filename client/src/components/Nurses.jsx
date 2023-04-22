import React from "react";
import { gql, useQuery } from "@apollo/client";
//import

const GET_NURSES = gql`
  query GetNurses {
    nurses {
      id
      name
      username
      password
    }
  }
`;

export default function Nurses() {
  const { loading, error, data } = useQuery(GET_NURSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {data.nurses.map((nurse) => (
              <tr key={nurse.id}>
                <td>{nurse.name}</td>
                <td>{nurse.username}</td>
                <td>{nurse.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
