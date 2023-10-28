// convex/mutations.js
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createGroupAndAddFriends = mutation({
  args: {
    groupName: v.string(),
    creatorId: v.id("users"),
    memberIds: v.array(v.id("users"))
  },
  handler: async (ctx, args) => {
    // Create a new group with the creator as the first member
    const group = await ctx.db.insert("groups", {
      name: args.groupName,
      members: [args.creatorId, ...args.memberIds]
    });

    // Optionally, update each member's user record to include the new group
    for (const memberId of args.memberIds) {
      await ctx.db.update("users", memberId, {
        $push: { groupId: group._id }
      });
    }

    return group._id;
  },
});
