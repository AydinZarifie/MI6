import React from "react";
//import "./styles/styles.css"


export default function Base(){

    async function logout(){
      localStorage.removeItem('token');
    }

    const navStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
    };
  
    const logoStyle = {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    };
  
    const navLinksStyle = {
      display: 'flex',
      gap: '15px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    };
  
    const linkStyle = {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '1rem',
    };
  
    const linkHoverStyle = {
      textDecoration: 'underline',
    };
  
    return (
      <nav style={navStyle}>
        <div style={logoStyle}>MI6 Mission Control</div>
        <ul style={navLinksStyle}>
          <li>
            <a href="/dashboard" style={linkStyle}>
            Agent Briefing
            </a>
          </li>
          <li>
            <a href="/mission" style={linkStyle}>
            Operations
            </a>
          </li>
          <li>
            <a href="/equipment" style={linkStyle}>
            Gadgets
            </a>
          </li>
          <li>
            <a href="/addmission" style={linkStyle}>
            Assign Mission
            </a>
          </li>
          <li>
            <a href="/addequipment" style={linkStyle}>
            Issue Gadget
            </a>
          </li>
          <li>
            <a href="/" style={linkStyle} onClick={logout}>
            Sign Out
            </a>
          </li>
          <li>
            <a href="/login" style={linkStyle}>
            Agent Login
            </a>
          </li>
          <li>
            <a href="/register" style={linkStyle}>
            Agent Enrollment
                </a>
          </li>
        </ul>
      </nav>
    );
  };