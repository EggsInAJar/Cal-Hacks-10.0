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

  return (
    <div>
      <button onClick={toggleDropdown} className="user-button">
        Friend ▼
      </button>
      {isOpen && (
        <ul className="dropdown-menu-user">
        <li><button style={{backgroundColor: 'black'}}>zkhan64</button></li>
        <li><button style={{backgroundColor: 'black'}}>mzheng16</button></li>
        <li><button style={{backgroundColor: 'black'}}>achang256</button></li>
        <li><button style={{backgroundColor: 'black'}}>sranja4</button></li>
        <li><button style={{backgroundColor: 'black'}}>shabs1024</button></li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;