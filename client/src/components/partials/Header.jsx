import logo from "./../assets/medicalapp.png";
import AuthContext from "../context/authContext";
import { useContext } from "react";

export default function Header() {
  const authContext = useContext(AuthContext);
  console.log(authContext);

  const logout = () => {
    authContext.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>MedApp</div>
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {authContext.token && (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Hi, Welcome to the {authContext.role} panel.
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
