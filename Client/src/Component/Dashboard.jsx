import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Dashboard = () => {

  const [suc, Setsuc] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:5000/dashboard")
      .then((response) => {
        console.log(" dashboard data", response.data);
        if (response.data.status === "Success") {
          Setsuc("Success OK");
        } else {
          navigate("/");
        }
      }).catch((error) => {
        console.error("There was an error fetching the dashboard data!", error);
      })
  }, [])

  // const handleLogout = () => {
  //   console.log("Logging out...");
  //   localStorage.removeItem("token");
  //   navigate("/login"); // or wherever your login page is
  // };
  

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/logout", {}, { withCredentials: true }); // ✅ Send request
    navigate("/login");
  };
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{suc}</p>
      <button className='p-1.5 bg-red-800' onClick={handleLogout}>Logout</button>  {/* Wrap navigate with arrow function */}

    </div>
  )
}

export default Dashboard