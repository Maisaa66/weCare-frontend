
import { Link, useLocation } from "react-router-dom";
import classes from './Nav.css'

export default function Nav() {

   return (
    <nav className="navbar  navbar-expand-lg bg-light rounded-5">
      <div className="container-fluid">
        <div>
          <Link to="/" className="navbar-brand d-lg-block d-none m-0 ">
            <img
              width="75px"
              src={process.env.PUBLIC_URL + "/Images/logo.png"}
              alt="Logo"
            />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <Link to="charts" className="nav-link active lihover" aria-current="page">
                Charts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="requests"
                className="nav-link  lihover"
                aria-current="page"
              >
                All Requests 
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link lihover" to="users">
                All Users
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link lihover" to="providers">
                All Service providers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

