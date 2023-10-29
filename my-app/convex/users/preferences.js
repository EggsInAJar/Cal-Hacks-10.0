// convex/mutations.js
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const addUserPreferences = mutation({
  args: {
    userId: v.id("users"),
    cuisine: v.string(),
    priceRange: v.string(),
    favoriteRestaurants: v.array(v.id("restaurants")),
    favoriteFoods: v.array(v.id("foods")),
    dietaryRestrictions: v.string(),
    dislikedFoods: v.array(v.string()),
  },
  handler: async (ctx, args) => {
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
    dietaryRestrictions: v.optional(v.string()),
    dislikedFoods: v.optional(v.array(v.string())),
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
