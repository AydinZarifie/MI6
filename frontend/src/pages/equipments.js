import React, { useEffect, useState } from 'react';

export default function Equipments() {
  const [equipments, setEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data from the API
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch("http://localhost:5000/equipment/get_equipments",{
          headers:{
            'Content-type':'application/json',
             Authorization : 'Bearer ' + localStorage.getItem('token')
          }
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log(data);
        
        setEquipment(data.equipment); // Assuming data is an array of users
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
      <h2>Issued Gadgets</h2>
      <table class="table table-dark table-striped mt-4">
        <thead>
          <tr>
            <th style={{paddingLeft:10}}>Gadget</th>
            <th style={{paddingLeft:150}}>Description</th>
            <th style={{paddingLeft:150}}>Issued To</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((eq) => (
            <tr key={eq.id}>
              <td style={{paddingLeft:10}}>{eq.title}</td>
              <td style={{paddingLeft:150}}>{eq.description}</td>
              <td style={{paddingLeft:150}}>{eq.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
