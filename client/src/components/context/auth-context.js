import React from "react";

export default React.createContext({
  token: null,
  userId: null,
  role: null,
  username: null,
  //isAuthenticated: false,

  login: (token, role, userId, tokenExpiration) => {},
  logout: () => {},
});
