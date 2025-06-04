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

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{suc}</p>
    </div>
  )
}

export default Dashboard