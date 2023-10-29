import React, { useState } from 'react';
import { SignInButton, SignOutButton } from "@clerk/clerk-react";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleDropdown} className="profile-button">
        Profile ▼
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
        <li><a href="/preferences">Preferences</a></li>
        <li><a href="/friends">Friends</a></li>
        <li><SignOutButton>
            <button className="signOutButton">
            Sign Out
        </button>
            </SignOutButton>
        </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;