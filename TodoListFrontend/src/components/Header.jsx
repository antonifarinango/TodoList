import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="mb-5 mt-1">
        <header className="row d-flex">
          <div className="col-6 text-center">
            <h1>TodoList</h1>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <nav className="nav text-center">
            <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/crear-tarea">
                Crear Tarea
              </Link>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
