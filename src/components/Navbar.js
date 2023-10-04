import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import todologo from './t.png';

const Navbar = (prpos) => {
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authenticatedUser');
        navigate("/login");
    }
    let location = useLocation();
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/todolist_react">
                       
                        <img src={todologo} alt="Your Logo" width="50" height="50" />
                      
                    </Link>
                    <h4 className = "navbar nav-item brand">Todulo</h4>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/todolist_react" ? 'active' : ''}`} aria-current="page" to="/todolist_react">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? 'active' : ''}`} to="/about">About</Link>
                            </li>

                        </ul>
                        {!localStorage.getItem('authenticatedUser') ? <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/login" role='button'>Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role='button'>SignUp</Link>
                        </form> :
                            <button onClick={handleLogout} className="btn btn-primary">Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
