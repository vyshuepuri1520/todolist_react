import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some((u) => u.email === credentials.email);
        if (userExists) {
            props.showAlert("User already exists", "danger");
        }
        else {
            const newUser = {
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
            };
            users.push(newUser);
            console.log(users);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('authenticatedUser', JSON.stringify(newUser));
            props.showAlert("Account Created Successfully", "success");
            navigate("/");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h2>Create an account to use Todulo:</h2><br />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" value={credentials.name} onChange={onChange} className="form-control" id="name" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" onChange={onChange} className="form-control" id="cpassword" name="cpassword" minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary ">Submit</button>
            </form>
        </div>
    )
}

export default Signup;
