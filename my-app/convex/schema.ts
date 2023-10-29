import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    restaurants: defineTable({
        name: v.string(),
        rating: v.float64(),
        location: v.string(), // or geolocation type if available
        cuisineType: v.string(),
        priceRange: v.string(),
        description: v.string(),
    }),

    users: defineTable({
        name: v.string(),
        email: v.string(),
        preferences: v.optional(v.id("preferences")),
    }),

    preferences: defineTable({
        userId: v.optional(v.union(v.id("users"), v.null())),
        cuisine: v.string(),
        priceRange: v.string(),
        favoriteRestaurants:v.array(v.string()),
        favoriteFoods: v.array(v.string()),
        dietaryRestrictions: v.array(v.string()),
        dislikedFoods: v.array(v.string()),
    }),

    dietaryRestrictions: defineTable({
        name: v.string(),
    }),

    reviews: defineTable({
        userId: v.id("users"),
        restaurantId: v.id("restaurants"),
        rating: v.float64(),
        reviewText: v.string(),
    }),

    foods: defineTable({
        name: v.string(),
        cuisineType: v.optional(v.string()),
    }),

    cuisines: defineTable({
        name: v.string(),
    }),
})