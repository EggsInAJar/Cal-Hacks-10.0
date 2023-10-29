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
        preferences: v.id("preferences"),
        groupId: v.array(v.id("groups")),
        friends: v.array(v.id("users")), // Added field for friends
    }),

    preferences: defineTable({
        userId: v.union(v.id("users"), v.null()),
        cuisine: v.string(),
        priceRange: v.string(),
        favoriteRestaurants: v.array(v.id("restaurants")),
        favoriteFoods: v.array(v.id("foods")),
        dietaryRestrictions: v.string(),
        dislikedFoods: v.array(v.string()),
    }),

    groups: defineTable({
        name: v.string(),
        description: v.string(),
        members: v.array(v.id("users")), // Adjusted to always expect an array
    }),

    reviews: defineTable({
        userId: v.id("users"),
        restaurantId: v.id("restaurants"),
        rating: v.float64(),
        reviewText: v.string(),
    }),

    foods: defineTable({
        name: v.string(),
        cuisineType: v.string(),
    }),
})