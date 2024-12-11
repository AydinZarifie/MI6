import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data from the API
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/dashboard",{
          headers:{
            'Content-type':'application/json',
            Authorization : 'Bearer ' + localStorage.getItem('token')
          }
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data.data); // Assuming data is an array of users
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  return (
<div class="container">
    <h1 class="display-4">Welcome, Agent  {userData.username}</h1>
    <p class="lead">Role:{userData.role}</p>

    <div class="row mt-4">
        <div class="col-md-4">
            <div class="card text-white bg-dark mb-3">
                <div class="card-header">Operations</div>
                <div class="card-body">
                    <p class="card-text">Access your assigned operations and missions.</p>
                    <a href="/mission" class="btn btn-primary">View Operations</a>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card text-white bg-dark mb-3">
                <div class="card-header">Gadgets</div>
                <div class="card-body">
                    <p class="card-text">Access your issued gadgets and equipment.</p>
                    <a href="/equipment" class="btn btn-primary">View Gadgets</a>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card text-white bg-dark mb-3">
                <div class="card-header">Command Center</div>
                <div class="card-body">
                    <p class="card-text">Manage missions and agents.</p>
                    <a href="/addmission" class="btn btn-primary">Assign Mission</a>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}