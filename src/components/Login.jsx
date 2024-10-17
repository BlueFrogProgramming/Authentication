import { useState } from 'react'
import { useEffect } from 'react'
import './Styles/Login-RegisterStyle.css'

function Login({ onNavigate }) {
  const [message, setMessage] = useState('')
  const [ loginData, setLoginData ] = useState({
    username: '',
    password: ''
  })



  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/authenticate", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      
      const isJson = response.headers.get('content-type')?.includes('application/json');

      if (response.ok) {
        const data = isJson ? await response.json() : null;
        console.log("POST successful!", data);
        setMessage(data.message)
        
        if (data.message === "User logged in successfully!") {
          onNavigate("profile")
        }
        
      } else {
        const errorData = isJson ? await response.json() : { message: 'Unknown error occurred' };
        console.error("POST failed:", errorData);
        setMessage(errorData.message)
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage('An unexpected error occurred')
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  return (
    <>
      <div class="wrapper" >
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div class="input-box" >
            <input type="text" placeholder="Username" name="username" value={loginData.username} onChange={handleChange} required ></input>
          </div>
          <div class="input-box" >
            <input type="text" placeholder="Password" name="password" value={loginData.password} onChange={handleChange} required ></input>
          </div>
          <button type="submit" class="submit-button" >Login</button>
        </form>
        <p>{message}</p>
        <p class="change-page-text">Don't have an account? </p>
        <button onClick={() => onNavigate("register")} class="change-page">Register</button>
      </div>
    </>
  )
}

export default Login
