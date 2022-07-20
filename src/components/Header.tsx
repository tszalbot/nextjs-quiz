import "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faBars } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-light shadow">
      <div className="container">
        <div className="row align-items-center w-100">
          <div className="col px-3">
            Header
          </div>

          <div className="col-auto">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
