const sdk = require("api")("@yelp-developers/v1.0#420s3alobgub91");
const YELP_API_KEY = "NMZnVj7gawTVjIYsQzC6E7v6XrykRmeaT7JUoihaps-navQFkADN6Nyp4WGpafrTbxZVrB8DhA-L2d2kI1YrSyBsAgsgmvvw1Yx7egh08i8Cc69qeVGTk9K2cnY-ZXYx";

// Function to get detailed information about a restaurant from Yelp
async function getYelpRestaurantInfo(latitude, longitude) {
  sdk.auth(YELP_API_KEY);
  try {
    const { data } = await sdk.v3_business_search({
      latitude: latitude,
      longitude: longitude,
      sort_by: "best_match",
      limit: "1",
    });
    return data.businesses[0]; // Assuming the first match is the most relevant
  } catch (err) {
    console.error(err);
  }
}

// Function to find restaurants using Google Places API
async function findRestaurants(location, radius) {
  const GOOGLE_API_KEY = "AIzaSyC2Lp98v2BVcvGfVTKA3SUYqIrED86_F6E"; // Replace with your Google API Key
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${encodeURIComponent(
    location
  )}&radius=${radius}&type=restaurant&key=${GOOGLE_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  const enrichedRestaurants = [];

  // For each restaurant, get detailed information from Yelp
  for (const restaurant of data.results) {
    const { lat, lng } = restaurant.geometry.location;
    const yelpInfo = await getYelpRestaurantInfo(lat, lng);
    
    if (yelpInfo) {
      restaurant.yelpInfo = yelpInfo;
      enrichedRestaurants.push(restaurant);
    }
  }

  return enrichedRestaurants;
}

// Example usage
findRestaurants("37.7749,-122.4194", 1000) // Replace with desired location and radius
  .then(restaurants => console.log(restaurants))
  .catch(err => console.error(err));