import Header from "./components/partials/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Patients from "./components/pages/Patients";
import Login from "./components/pages/Login";

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
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <Login />
      </ApolloProvider>
    </>
  );
}

export default App;
