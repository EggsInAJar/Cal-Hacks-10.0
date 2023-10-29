import { query } from "../_generated/server";
import { v } from "convex/values";

export const getCurrentPreferences = query({
    args: { emails: v.array(v.string()) },
    handler: async (ctx, args) => {
        // Initialize an object to store aggregated preferences
        const aggregatedPreferences = {
            cuisines: [],
            dietaryRestrictions: [],
            dislikedFoods: [],
            favoriteFoods: [],
            favoriteRestaurants: [],
            priceRanges: [],
        };

        // Fetch users based on the provided emails
        for (const email of args.emails) {
            const user = await ctx.db.query("users").filter(q => q.eq(q.field("email"), email)).first();
            if (user && user.preferences) {
                // Fetch the user's preferences
                const preferences = await ctx.db.get(user.preferences);
                if (preferences) {
                    // Merge preferences
                    aggregatedPreferences.cuisines.push(...preferences.cuisine);
                    aggregatedPreferences.dietaryRestrictions.push(...preferences.dietaryRestrictions);
                    aggregatedPreferences.dislikedFoods.push(...preferences.dislikedFoods);
                    aggregatedPreferences.favoriteFoods.push(...preferences.favoriteFoods);
                    aggregatedPreferences.favoriteRestaurants.push(...preferences.favoriteRestaurants);
                    if (preferences.priceRange) {
                        aggregatedPreferences.priceRanges.push(preferences.priceRange);
                    }
                }
            }
        }

        if (aggregatedPreferences.cuisines.length === 0) {
            return {}; // No preferences found for the given emails
        }

        // Remove duplicates from arrays
        aggregatedPreferences.cuisines = [...new Set(aggregatedPreferences.cuisines)];
        aggregatedPreferences.dietaryRestrictions = [...new Set(aggregatedPreferences.dietaryRestrictions)];
        aggregatedPreferences.dislikedFoods = [...new Set(aggregatedPreferences.dislikedFoods)];
        aggregatedPreferences.favoriteFoods = [...new Set(aggregatedPreferences.favoriteFoods)];
        aggregatedPreferences.favoriteRestaurants = [...new Set(aggregatedPreferences.favoriteRestaurants)];
        aggregatedPreferences.priceRanges = [...new Set(aggregatedPreferences.priceRanges)];

        return aggregatedPreferences;
    },
});