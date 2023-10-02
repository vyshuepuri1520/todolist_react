import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [credentials , setCredentials] = useState({email:"",password:""})
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === credentials.email);
    if (user && user.password === credentials.password) {
        localStorage.setItem('authenticatedUser', JSON.stringify(user));
        props.showAlert("Login Successfully","success");
        navigate("/");
      } 
      else {
        props.showAlert("Invalid credentials","danger");
      }
    }

    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }

return (
  <div>
    <h3>Please Login or Register your account to use the application...</h3><br />
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label  htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" value={credentials.email} onChange={onChange}  className="form-control transparent-textbox" id="email" name="email" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" value={credentials.password} onChange={onChange} className="form-control" id="password" name="password" />
      </div>
      <button type="submit" className="btn btn-primary ">Submit</button>
    </form>
  </div>
)
}

export default Login;
