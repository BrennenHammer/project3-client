import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { post } from "../services/authService";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.includes('@')) {
      setMessage('Please enter a valid email address.');
      return;
    }

    post('/auth/signup', formData, false)
    .then(response => {
        storeToken(response.data.authToken)
        authenticateUser()
        navigate("/profile")
        setMessage('Signup successful! Please log in.');
        setFormData({ email: '', username: '', password: '' });
    })
    .catch(error => {
        setMessage('There was an issue with the signup. Please try again.');
    });
  };

  return (
    <div className="loginvw">
    <> <p className="signupP">Do you have talent? Show the world!</p>
    <div className="Logindiv">
      {message && <p>{message}</p>} {}

      <form onSubmit={handleSubmit}>
        <label>Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
    </>
    </div>
  );
};

export default Signup;

  