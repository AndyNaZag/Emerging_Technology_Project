import Header from "./components/partials/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Patients from "./components/pages/Patients";
import Login from "./components/pages/Login";
import AuthContext from "./components/context/auth-context";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        patients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        nurses: {
          // <--- Nurses do not need this because they are not gonna be queried (BE does that (Admin))
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  const [state, setState] = useState({ token: null, role: null, userId: null });

  const login = (token, role, userId, tokenExpiration) => {
    setState({ token: token, role: role, userId: userId });
  };

  const logout = () => {
    setState({ token: null, role: null, userId: null });
  };

  return (
    <>
      <ApolloProvider client={client}>
        <AuthContext.Provider
          value={{
            token: state.token,
            role: state.role,
            userId: state.userId,
            login: login,
            logout: logout,
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/patients" element={<Patients />} />
          </Routes>
        </AuthContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
