// convex/mutations.js
import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

export const addUserPreferences = mutation({
  args: {
    userId: v.id("users"),
    cuisine: v.string(),
    priceRange: v.string(),
    favoriteRestaurants: v.array(v.string()),
    favoriteFoods: v.array(v.string()),
    dietaryRestrictions: v.array(v.string()),
    dislikedFoods: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    console.log(args);
    await ctx.db.insert("preferences", {
      userId: args.userId,
      cuisine: args.cuisine,
      priceRange: args.priceRange,
      favoriteRestaurants: args.favoriteRestaurants,
      favoriteFoods: args.favoriteFoods,
      dietaryRestrictions: args.dietaryRestrictions,
      dislikedFoods: args.dislikedFoods,
    });
  },
});

export const updateUserPreferences = mutation({
  args: {
    preferencesId: v.id("preferences"),
    cuisine: v.optional(v.string()),
    priceRange: v.optional(v.string()),
    favoriteRestaurants: v.optional(v.array(v.id("restaurants"))),
    favoriteFoods: v.optional(v.array(v.id("foods"))),
    dietaryRestrictions: v.optional(v.id("dietaryRestrictions")),
    dislikedFoods: v.optional(v.array(v.id("foods"))),
  },
  handler: async (ctx, args) => {
    await ctx.db.update("preferences", args.preferencesId, {
      ...(args.cuisine && { cuisine: args.cuisine }),
      ...(args.priceRange && { priceRange: args.priceRange }),
      ...(args.favoriteRestaurants && {
        favoriteRestaurants: args.favoriteRestaurants,
      }),
      ...(args.favoriteFoods && { favoriteFoods: args.favoriteFoods }),
      ...(args.dietaryRestrictions && {
        dietaryRestrictions: args.dietaryRestrictions,
      }),
      ...(args.dislikedFoods && { dislikedFoods: args.dislikedFoods }),
    });
  },
});

export const getGroupMembersCuisinePreferences = query({
  args: { groupId: v.id("groups") },
  handler: async (ctx, args) => {
    // Fetch the group details
    const group = await ctx.db.get(args.groupId);
    if (!group) {
      return []; // Group not found
    }

    // Initialize an array to store cuisine preferences
    const cuisinePreferences = [];

    // Fetch preferences for each member in the group
    for (const memberId of group.members) {
      const user = await ctx.db.get("users", memberId);
      if (user && user.preferences) {
        const preferences = await ctx.db.get("preferences", user.preferences);
        if (preferences) {
          cuisinePreferences.push(preferences.cuisine);
        }
      }
    }

    return cuisinePreferences; // Returns a list of cuisines preferred by group members
  },
});