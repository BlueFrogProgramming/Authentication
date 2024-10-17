import { useState } from 'react'
import { useEffect } from 'react'

function Profile({ onNavigate }) {

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getdata", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          console.log("GET successful!", data);
        } else {
          console.error("GET failed:", data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getData();
  }, []);


  return (
    <>
        <h1>Profile</h1>
        <p></p>
        <button onClick={() => onNavigate('register')}>go to page register</button>
        <button onClick={() => onNavigate('login')}>go to page login</button>
    </>
  )
}

export default Profile
