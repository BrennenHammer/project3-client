import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

import { Link, useNavigate } from "react-router-dom";

import { post } from "../services/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
  
    const { storeToken, authenticateUser } = useContext(AuthContext)
    
    const navigate = useNavigate();
  
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
  
    
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      const requestBody = { email, password };
   
      post('/auth/login', requestBody)
        .then((response) => {

          console.log('JWT token', response.data.authToken );
          storeToken(response.data.authToken)
          authenticateUser()
          navigate('/feed');                             // <== ADD      
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        })
    };
    
    return (
      <div className='loginvw'>
      <> <p className="loginp">Lets get you're talent on display!</p>
      <div className="Logindiv">
        <h1>Login</h1>
  
        <form onSubmit={handleLoginSubmit}>
          <label>Email:</label>
          <input 
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
  
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
  
          <button type="submit">Login</button>
        </form>
        { errorMessage && <p className="error-message">{errorMessage}</p> }
  
        
        <Link to="/Feed"> log in..</Link>


      </div>
      </>
      </div>
    )
}

export default Login