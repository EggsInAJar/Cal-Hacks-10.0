import { query } from "../_generated/server";
import { v } from "convex/values";

export const getCurrentPreferences = query({
    args: { emails: v.array(v.string()) },
    handler: async (ctx, args) => {
        // Initialize an array to store aggregated preferences
        const aggregatedPreferences = [];

        // Fetch users based on the provided emails
        for (const email of args.emails) {
            const user = await ctx.db.table("users").filter(q => q.eq(q.field("email"), email)).first();
            if (user && user.preferences) {
                // Fetch the user's preferences
                const preferences = await ctx.db.get("preferences", user.preferences);
                if (preferences) {
                    aggregatedPreferences.push(preferences);
                }
            }
        }

        if (aggregatedPreferences.length === 0) {
            return []; // No preferences found for the given emails
        }

        return aggregatedPreferences;
    },
});
