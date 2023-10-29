import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/profileDropdown.css';
import { useQuery } from "convex/react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import RestaurantCard from './components/restaurantcard';
import RestaurantImage from './assets/restaurant.jpg';
import RestaurantMap from "./components/RestaurantMap";
import ProfileDropdown from './components/profileDropdown';

function App() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  const tasks = useQuery(api.tasks.get);
  const findRestaurants = useAction(api.findRestaurants.findRestaurants);

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
  }, []);

  useEffect(() => {
    // Find Restaurants Based on Location
    async function fetchData() {
      console.log('fetching data', location)
      const result = await findRestaurants({location: `${location.lat}, ${location.lng}`, radius: 500});
      setRestaurants(result);
      console.log('data result', result)
    }
    fetchData();
  }, [location]);


  const sampleData = [
    {
      name: 'The Fancy Fork',
      cuisine: 'Italian',
      description: 'An exquisite Italian experience with a modern twist! sdkbfsoidnvpzklxjnvpkasjdnvkxzjndfvlkdzxjcvn lkczxjvnlkdzjx.',
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
    {
      name: 'The Fancy Fork',
      cuisine: 'Italian',
      description: 'An exquisite Italian experience with a modern twist! sdkbfsoidnvpzklxjnvpkasjdnvkxzjndfvlkdzxjcvn lkczxjvnlkdzjx.',
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
        <div className = "mapBackground">
          <RestaurantMap location={location} restaurants={restaurants}></RestaurantMap>
        </div>
        <div className='parent'>
          <div className='leftSide'>
            <div className='scroll'>
              {sampleData.map((item, index) => (
                <RestaurantCard key={index} item={item} />
              ))}
            </div>
          </div>
        <div className = 'rightSide'></div>
        <div className = 'spacer'>
          
        </div>

        </div>
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
            <ProfileDropdown />
          </div>
        </div> 
      </Authenticated>
      {/* {isAuthenticated ? "Logged in" : "Logged out or still loading"} */}
     </div>
    </div>
  )
}

export default App
