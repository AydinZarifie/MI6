import React, { useState } from 'react';

export default function AddMission (){
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Input validation (optional)
    if (!username || !title || !description) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/equipment/create_equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ username, description, title }),
      });
      console.log(response);  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to signup.');
      }

      const data = await response.json();
      setSuccess('Equipment assign successfully');
      console.log('User signed up:', data);

      // Clear form
      setUsername('');
      setTitle('');
      setDescription('');
    } catch (err) {
      setError("Invalid access");
    } finally {
      setIsLoading(false);
    }
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
  };

  const formStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "300px",
  };

  const inputStyle = {
    width: "80%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  };

  const textareaStyle = {
    ...inputStyle,
    height: "100px",
    resize: "none",
  };

  const buttonStyle = {
    width: "80%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={headerStyle}>Issue gadget</h2>
      <input
        type="text"
        name="op_name"
        placeholder="gadget_title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
        required
      />
      <input
        type="text"
        name="username"
        placeholder="code_name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
        required
      />
      <textarea
        name="description"
        placeholder="Gadget discription ..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={textareaStyle}
        required
      />
      <button type="submit" style={buttonStyle}>
        Assign Gadget
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    
  </div>
  );
};


