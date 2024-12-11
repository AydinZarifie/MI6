import React, { useEffect, useState } from 'react';

export default function Misson() {
  const [operations, setOperation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user data from the API
  useEffect(() => {
    const fetchUsers = async () => {
      
      try {
        
        const response = await fetch('http://localhost:5000/mission/get_missions',{
          headers:{
            'Content-type':'application/json',
            Authorization : 'Bearer ' + localStorage.getItem('token')
          }
        }); // Replace with your API endpoint
        if (!response.ok) {
          
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        console.log(data);
        console.log(1);
        localStorage.setItem('auth  ',data.token);
        localStorage.setItem('userid',data.userid);
        console.log("data store in localstorage");
        const auth = localStorage.getItem('auth');
        console.log(auth);
        
        
        setOperation(data.mission); // Assuming data is an array of users
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div class="container">
    <h2>Operations Briefing</h2>
    <table class="table table-dark table-striped mt-4">
        <thead>
            <tr>
                <th style={{paddingLeft:10}}>Operation</th>
                <th style={{paddingLeft:150}}>Details</th>
                <th style={{paddingLeft:150}}> Assigned Agent</th>
            </tr>
        </thead>
        <tbody>
        {operations.map((op) => (
              <tr key={op.id}>
                <td style={{paddingLeft:10}}>{op.title}</td>
                <td style={{paddingLeft:150}}>{op.description}</td>
                <td style={{paddingLeft:150}}>{op.username}</td>
              </tr>
            ))}
        </tbody>
    </table>
</div>

  );
};



