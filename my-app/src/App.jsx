import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import RestaurantCard from './components/restaurantcard';
import RestaurantImage from './assets/restaurant.jpg';

function App() {
  const [count, setCount] = useState(0)
  const tasks = useQuery(api.tasks.get);
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  const sampleData = [
    {
      name: 'The Fancy Fork',
      cuisine: 'Italian',
      description: 'An exquisite Italian experience with a modern twist.',
      image: RestaurantImage,
    },
    {
      name: 'Sushi Hub',
      cuisine: 'Japanese',
      description: 'Fresh and authentic sushi crafted by experienced chefs.',
      image: RestaurantImage,
    },
    {
      name: 'Curry Palace',
      cuisine: 'Indian',
      description: 'Aromatic Indian dishes that bring the flavors of the East.',
      image: RestaurantImage,
    },
    {
      name: 'Cur Pal',
      cuisine: 'Indi',
      description: 'Aromatic dishes that bring the flavors of the East.',
      image: RestaurantImage,
    },
  ];

  return (
    <div>
     {/* <Authenticated>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </Authenticated> */}


      <Authenticated>
        <div className='parent'>
          <div className='leftSide'>
            {sampleData.map((item, index) => (
              <RestaurantCard key={index} item={item} />
            ))}
          </div>
        <div className = 'rightSide'>
          <div className = 'map'>
          </div>
        </div>
        <div className = 'spacer'>
          
        </div>

        </div>
        {/* <div className="container">
          <h2>Suggested Restaurants</h2>
          <div className="restaurant-list">
            <RestaurantCard name="Restaurant Tomato" cuisine="Italian" description="good food for all." />
            <RestaurantCard name="Restaurant Potato" cuisine="Chinese" description="Description of place, etc." />
          </div>
        </div> */}
      </Authenticated>

     <div className="App">
      <Unauthenticated>
        <div className="unauthtitle">
          Eatinerary
        </div>
         <SignInButton mode="modal" /> 
      </Unauthenticated>

      <Authenticated> 
        <div>
          <div className="authtitle">
            Eatinerary
          </div>
          <div className="title">
            Suggested Restaurants
          </div>
          {/* <SignOutButton mode="modal" /> */}
        </div> 
      </Authenticated>
      {/* {isAuthenticated ? "Logged in" : "Logged out or still loading"} */}
     </div>
    </div>
  )
}

export default App
