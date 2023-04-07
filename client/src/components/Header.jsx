import logo from "./assets/medicalapp.png";

export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div>
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>MedApp</div>
          </div>
        </a>
      </div>
    </nav>
  );
}
