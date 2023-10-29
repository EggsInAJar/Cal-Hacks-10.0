// convex/mutations.js
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const addUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    preferences: v.optional(v.id("preferences")),
    groupId: v.optional(v.array(v.id("groups"))),
    friends: v.optional(v.array(v.id("users"))),
  },
  handler: async (ctx, args) => {
    const newUser = {
      name: args.name,
      email: args.email,
      preferences: args.preferences,
      groupId: args.groupId,
      friends: args.friends
    };

    // Insert the new user into the 'users' table
    await ctx.db.insert("users", newUser);

    return "User added successfully";
  },
});
