// Importing necessary libraries
import { action } from "./_generated/server";
import { v } from "convex/values";

// Defining the action function
export const findRestaurants = action({
  args: {
    location: v.string(),
    radius: v.number(),
  },
  handler: async (_, args) => {
    // Building the URL for the Google Places API request
    // const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${encodeURIComponent(args.location)}&radius=${args.radius}&type=restaurant&key=${process.env.GOOGLE_API_KEY}`;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${encodeURIComponent(args.location)}&radius=${args.radius}&type=restaurant&key=AIzaSyC2Lp98v2BVcvGfVTKA3SUYqIrED86_F6E`;
    
    // Making the HTTP request to the Google Places API
    const response = await fetch(url);
    const data = await response.json();

    // Parsing and returning the response data
    return data.results;
  },
});