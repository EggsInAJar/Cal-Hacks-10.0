// convex/userFunctions.ts
import { internalQuery, action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
// import axios from "axios"; // Assuming axios is being used for HTTP requests

// interface ChatMessage {
//     role: "system" | "user" | "assistant";
//     content: string;
// }

// interface ChatResponse {
//     choices: {
//         message: {
//             role: string;
//             content: string;
//         };
//     }[];
// }

export const getPreferredRestaurants = action({
  args: { user_id: v.id("users") },
  handler: async (ctx, args) => {
    const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
    const API_KEY = "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"; // Will obscure this later

    const headers = new Headers({
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    const messages = [
        { role: "user", content: "Say this is a test!" }
    ];

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages
            })
        });

        const data = await response.json();
        console.log(data);
        const assistantMessage = data.choices[0].message.content;
        return assistantMessage;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data from OpenAI");
    }
  },
});

// async function getPreferredRestaurants(userQuery: string): Promise<string> {
//     const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
//     const API_KEY = process.env.OPENAI_API_KEY; // Remember to keep this secret.

//     const headers = new Headers({
//         'Authorization': `Bearer ${API_KEY}`,
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     });

//     const messages: ChatMessage[] = [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: userQuery }
//     ];

//     try {
//         const response = await fetch(API_ENDPOINT, {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify({
//                 model: "gpt-3.5-turbo",
//                 messages: messages
//             })
//         });

//         const data: ChatResponse = await response.json();
//         const assistantMessage = data.choices[0].message.content;
//         return assistantMessage;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         throw new Error("Failed to fetch data from OpenAI");
//     }
// }



// Helper

export const getUserPreferences = internalQuery({
    args: { user_id: v.id("users") },
    handler: async (ctx, args) => {
      // Fetch user by ID
      const user = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("_id"), args.user_id))
        .take(1);

      if (!user || user.length === 0) {
        return null;
      }
  
      // Use the _id from the fetched user in the next query
      const user_id_from_first_query = user[0]._id;
  
      let preferences = await ctx.db
        .query("preferences")
        .filter((q) => q.eq(q.field("userId"), user_id_from_first_query))
        .take(1);

      console.log("preferences", preferences);
  
      if (!preferences || preferences.length === 0) {
        return null; 
      }
      
      let output = {
        cuisinePreferences: [],
        priceRangePreference: preferences[0].priceRange,
        favoriteRestaurants: [],
        favoriteFoods: [],
        dietaryRestrictions: [],
        dislikedFoods: [],
      };

      for(let i=0; i<preferences[0].cuisine.length; i++) {
        let temp = await ctx.db
          .query("cuisines")
          .filter((q) => q.eq(q.field("_id"), preferences[0].cuisine[0]))
          .take(1);
        output.cuisinePreferences.push(temp[0].name);
      }

      for(let i=0; i<preferences[0].dietaryRestrictions.length; i++) {
        let temp = await ctx.db
          .query("dietaryRestrictions")
          .filter((q) => q.eq(q.field("_id"), preferences[0].dietaryRestrictions[0]))
          .take(1);
        output.dietaryRestrictions.push(temp[0].name);
      }

      for(let i=0; i<preferences[0].dislikedFoods.length; i++) {
        let temp = await ctx.db
          .query("foods")
          .filter((q) => q.eq(q.field("_id"), preferences[0].dislikedFoods[0]))
          .take(1);
        output.dislikedFoods.push(temp[0].name);
      }

      for(let i=0; i<preferences[0].favoriteFoods.length; i++) {
        let temp = await ctx.db
          .query("foods")
          .filter((q) => q.eq(q.field("_id"), preferences[0].favoriteFoods[0]))
          .take(1);
        output.favoriteFoods.push(temp[0].name);
      }

      for(let i=0; i<preferences[0].favoriteRestaurants.length; i++) {
        let temp = await ctx.db
          .query("restaurants")
          .filter((q) => q.eq(q.field("_id"), preferences[0].favoriteRestaurants[0]))
          .take(1);
        output.favoriteRestaurants.push(temp[0].name);
      }
      console.log(output);

    return output;
    },
  });

  













