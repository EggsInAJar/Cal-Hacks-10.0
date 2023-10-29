// convex/userFunctions.ts
import { query } from "../_generated/server";
import { v } from "convex/values";
// import axios from "axios"; // Assuming axios is being used for HTTP requests
import fetch from "node-fetch";

interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

interface ChatResponse {
    choices: {
        message: {
            role: string;
            content: string;
        };
    }[];
}

async function getPreferredRestaurants(userQuery: string): Promise<string> {
    const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
    const API_KEY = process.env.OPENAI_API_KEY; // Remember to keep this secret.

    const headers = new Headers({
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    const messages: ChatMessage[] = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: userQuery }
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

        const data: ChatResponse = await response.json();
        const assistantMessage = data.choices[0].message.content;
        return assistantMessage;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data from OpenAI");
    }
}







// Helper

export const getUserPreferences = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("id"), args.userId))
      .take(1);

    if (!user || user.length === 0) {
      return null;
    }

    return {
      cuisinePreferences: user[0].cuisinePreferences,
      favoriteFoods: user[0].favoriteFoods,
    };
  },
});













