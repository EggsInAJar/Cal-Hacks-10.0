// convex/mutations.js
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const addUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    preferences: v.optional(v.id("preferences")),
  },
  handler: async (ctx, args) => {
    const newUser = {
      name: args.name,
      email: args.email,
      preferences: args.preferences,
    };

    // Insert the new user into the 'users' table
    await ctx.db.insert("users", newUser);

    return "User added successfully";
  },
});
