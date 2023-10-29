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
  const getPreferredRestaurants = useAction(api.controllers.suggestions_controllers.getPreferredRestaurants);

  const [restaurants, setRestaurants] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);
  const [count, setCount] = useState(0)
  const [location, setLocation] = useState({})

  const foods = ['🍕', '🍔', '🥗', '🍜', '🍦'];
  const [currentFood, setCurrentFood] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFood((prevFood) => (prevFood + 1) % foods.length);
    }, 2000);  // Change food every 2 seconds

    return () => clearInterval(timer);
  }, []);


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
      const result = await findRestaurants({location: `${location.lat}, ${location.lng}`, radius: 500});
      setRestaurants(result);
      console.log(result)
    }
    fetchData();
  }, [location]);

  useEffect(() => {
    let preferredRestaurants = getPreferredRestaurants({user_id: "4efwrqe9gpmhxew40rcqqctm9k5zecg", restaurants: restaurants.map(obj => obj.name)});

    console.log('entered')
    let card = [];
    for (let i = 0; i < restaurants.length; i++) {
      let temp = {name: restaurants[i].name};

      try {
      const photoReference = restaurants[i].photos[0].photo_reference;
      console.log(photoReference)
      const maxWidth = 200;  // You can specify the desired width of the image
      
      temp.image = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=AIzaSyC2Lp98v2BVcvGfVTKA3SUYqIrED86_F6E`;
      } catch (error) {
        temp.image = RestaurantImage;
      }

      temp.description = restaurants[i].vicinity;

      temp.cuisine = "$".repeat(restaurants[i].price_level);

      card.push(temp);
    }
    setCardInfo(card);
    console.log(card)

    console.log(getPreferredRestaurants({user_id: "4efwrqe9gpmhxew40rcqqctm9k5zecg", restaurants: restaurants.map(obj => obj.name)}))
  }, [restaurants]);

  const sampleData = [
    {
      name: 'The Fancy Fork',
      cuisine: 'Italian',
      description: 'An exquisite Italian experience with a modern twist!',
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
      description: 'An exquisite Italian experience with a modern twist!',
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
              {cardInfo.map((item, index) => (
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
        {/* <header className="App-header">
          <div className="logo">
            <div className="plate"></div>
            <div className="fork"></div>
            <div className="knife"></div>
          </div>
        </header> */}
          {/* <header className="App-header">
            <img src="path-to-your-logo.png" className="App-logo" alt="Eatinerary Logo" />
          </header> */}
           <div className="logo-container">
            <div className="plate">
              {foods[currentFood]}
            </div>
          </div>
        </div>
        <SignInButton>
          <button className="signInButton">
            Sign In
          </button>
        </SignInButton> 
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
