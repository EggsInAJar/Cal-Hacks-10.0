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
  const buttonStyle1 = hasBorder ? {border: '2px solid white'} : {};
  const buttonStyle2 = hasBorder ? {border: '2px solid white'} : {};
  const buttonStyle3 = hasBorder ? {border: '2px solid white'} : {};
  const buttonStyle4 = hasBorder ? {border: '2px solid white'} : {};


  return (
    <div>
      <button onClick={toggleDropdown} className="user-button">
        Friend ▼
      </button>
      {isOpen && (
        <ul className="dropdown-menu-user">
        <li><button style={buttonStyle} onClick={toggleBorder}>zkhan64</button></li>
        <li><button style={buttonStyle1}>mzheng16</button></li>
        <li><button style={buttonStyle2}>achang256</button></li>
        <li><button style={buttonStyle3}>sranja4</button></li>
        <li><button style={buttonStyle4}>shabs1024</button></li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;