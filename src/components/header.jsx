import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand px-3 mw-100">
        <a className="navbar-brand" href="/maestros">
          Classroom UPV
        </a>

        <div className="ms-auto">
          <button
            className="btn btn-outline-light bg-info"
            onClick={() => alert("Perfil")}
          >
            <i className="bi bi-person-circle"></i> J
          </button>
        </div>
      </nav>
    </>
  );
}
