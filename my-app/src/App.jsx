import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useQuery } from "convex/react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import RestaurantMap from "./components/RestaurantMap";

function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  const tasks = useQuery(api.tasks.get);
  const findRestaurants = useAction(api.findRestaurants.findRestaurants);
  const getPreferredRestaurants = useAction(api.controllers.suggestions_controllers.getPreferredRestaurants);

  const [restaurants, setRestaurants] = useState([]);
  const [count, setCount] = useState(0)
  const [location, setLocation] = useState({})


  useEffect(() => {
    // Get User Location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(pos);
      },
      () => {
        // Handle location error
        console.error('Error getting location');
        setLocation({}); // Set default location to empty
      }
    );

    console.log(getPreferredRestaurants({user_id: "4efwrqe9gpmhxew40rcqqctm9k5zecg"}))
  }, []);

  useEffect(() => {
    // Find Restaurants Based on Location
    async function fetchData() {
      const result = await findRestaurants({location: `${location.lat}, ${location.lng}`, radius: 500});
      setRestaurants(result);
    }
    fetchData();
  }, [location]);

  return (
    <>
     <div className="App">
      <SignInButton mode="modal" />
      <SignOutButton mode="modal" />


      {restaurants.map(restaurant => (<li key={restaurant.place_id}>{restaurant.name}</li>))}
      
      {isAuthenticated ? "Logged in" : "Logged out or still loading"}
    </div>
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
      <RestaurantMap location={location} restaurants={restaurants}></RestaurantMap>
    </>
  )
}

export default App
