import { useState } from 'react'
import { useEffect } from 'react'
import './Styles/Login-RegisterStyle.css'

function Page1({ onNavigate }) {

  const [ message, setMessage ] = useState('')
  const [ registerData, setRegisterData ] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
  })

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });
      
      const isJson = response.headers.get('content-type')?.includes('application/json');

      if (response.ok) {
        const data = isJson ? await response.json() : null;
        console.log("POST successful!", data);
        setMessage(data.message)
        
        if (data.message === "User registered and logged in successfully!") {
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
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  return (
    <>
      <div class="wrapper">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div class="input-box">
            <input type='text' placeholder="First Name" name="firstname" value={registerData.firstname} onChange={handleChange} required ></input>
          </div>
          <div class="input-box">
            <input type='text' placeholder="Last Name" name="lastname" value={registerData.lastname} onChange={handleChange} required ></input>
          </div>
          <div class="input-box">
            <input type='text' placeholder="Username" name="username" value={registerData.username} onChange={handleChange} required ></input>
          </div>
          <div class="input-box">
            <input type='text' placeholder="Email" name="email" value={registerData.email} onChange={handleChange} required ></input>
          </div>
          <div class="input-box">
            <input type='text' placeholder="Password" name="password" value={registerData.password} onChange={handleChange} required ></input>
          </div>
          <button type='submit' class="submit-button">Register</button>
        </form>
        <p>{message}</p>
        <p class="change-page-text">Already have an account? </p>
        <button onClick={() => onNavigate('login')} class="change-page">Login</button>
      </div>
    </>
  )
}

export default Page1
