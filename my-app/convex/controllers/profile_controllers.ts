import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// addUser. Uses Clerk to write user to the Convex db
export const addUser = mutation({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthenticated call to mutation");
    }
    const { tokenIdentifier, name, email } = identity;
    return await ctx.db.insert("users", { tokenIdentifier, name, email });
  },
});

// getUser. Takes user's tokenIdentifier. Returns a user by tokenIdentifier
export const getUser = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.getByTokenIdentifier(args.tokenIdentifier);
  },
});

// addPreference. Uses Clerk to add a preference for the user to the Convex db
export const addPreference = mutation({
  args: { preference: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Unauthenticated call to mutation");
    }
    const { tokenIdentifier } = identity;
    return await ctx.db.insert("preferences", { tokenIdentifier, preference: args.preference });
  },
});

// getPreferences. Takes user's tokenIdentifier. Returns preferences by tokenIdentifier
export const getPreferences = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.getPreferencesByTokenIdentifier(args.tokenIdentifier);
  },
});





// HELPERS

// getUser by tokenIdentifier. Returns a user by tokenIdentifier
export const getByTokenIdentifier = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), args.tokenIdentifier))
      .first(); // assuming you want to retrieve the first matched user

    return user;
  },
});

// getPreferencesByTokenIdentifier. Returns preferences by tokenIdentifier
export const getPreferencesByTokenIdentifier = query({
    args: { tokenIdentifier: v.string() },
    handler: async (ctx, args) => {
      const preferences = await ctx.db
        .query("preferences")
        .filter((q) => q.eq(q.field("tokenIdentifier"), args.tokenIdentifier))
        .first(); // assuming you want to retrieve the first matched preferences
  
      return preferences;
    },
  });
