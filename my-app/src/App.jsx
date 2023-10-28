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

function App() {
  const tasks = useQuery(api.tasks.get);
  const findRestaurants = useAction(api.findRestaurants.findRestaurants);

  const [restaurants, setRestaurants] = useState([]);
  const [count, setCount] = useState(0)
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();


  useEffect(() => {
    async function fetchData() {
      const result = await findRestaurants({location: '40.748817,-73.985428', radius: 500});
      setRestaurants(result);
    }
  
    fetchData();
  }, []);

  return (
    <>
     <div className="App">
      <SignInButton mode="modal" />
      <SignOutButton mode="modal" />

      {restaurants.length > 0 && restaurants.map(restaurant => (<li key={restaurant.place_id}>{restaurant.name}</li>))}
      
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
    </>
  )
}

export default App
