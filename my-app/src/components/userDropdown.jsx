import React, { useState } from 'react';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const [hasBorder, setHasBorder] = useState(false);

  // Toggle the state when the button is clicked
  const toggleBorder = () => {
      setHasBorder(!hasBorder);
  }

  const buttonStyle = hasBorder ? {border: '2px solid white'} : {};

  return (
    <div>
      <button onClick={toggleDropdown} className="user-button">
        Friend ▼
      </button>
      {isOpen && (
        <ul className="dropdown-menu-user">
        <li><button style={buttonStyle} onClick={toggleBorder}>zkhan64</button></li>
        <li><button style={buttonStyle}>mzheng16</button></li>
        <li><button style={buttonStyle}>achang256</button></li>
        <li><button style={buttonStyle}>sranja4</button></li>
        <li><button style={buttonStyle}>shabs1024</button></li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;