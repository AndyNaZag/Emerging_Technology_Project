import Header from "./components/partials/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import NursePortal from "./components/pages/Nurse/NursePortal";
import PatientPortal from "./components/pages/Patient/PatientPortal";
import Login from "./components/pages/Login";
import AuthContext from "./components/context/authContext";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./components/pages/Register";
import MotivationTip from "./components/pages/Patient/MotivationTip";
import SymptomsCheck from "./components/pages/Patient/SymptomsCheck";
import Vitals from "./components/pages/Patient/Vitals";
import MotivationalTip from "./components/pages/Nurse/MotivationalTip";
import PatientsList from "./components/pages/Nurse/PatientsList";
import Alerts from "./components/pages/Nurse/Alerts";

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
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    if (token && role && userId) {
      setState({ token: token, role: role, userId: userId });
    }
  }, []);

  const login = (token, role, userId, tokenExpiration) => {
    setState({ token: token, role: role, userId: userId });
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setState({ token: null, role: null, userId: null });
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    localStorage.setItem("userId", "");
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
            {!state.token && <Route path="/" element={<Login />} />}
            {state.token && state.role === "Nurse" && (
              <Route path="/" element={<NursePortal />} />
            )}
            {state.token && state.role === "Patient" && (
              <Route path="/" element={<PatientPortal />} />
            )}
            <Route path="/register" element={<Register />} />
            <Route path="/vitals" element={<Vitals />} />
          <Route path="/motivation-tip" element={<MotivationTip />} />
          <Route path="/symptoms-check" element={<SymptomsCheck />} />
          <Route path="/patients-list" element={<PatientsList />} />
          <Route path="/motivational-tip" element={<MotivationalTip />} />
          <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </AuthContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
