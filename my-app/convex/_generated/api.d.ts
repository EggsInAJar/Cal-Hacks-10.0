/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.5.1.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as controllers_suggestions_controllers from "../controllers/suggestions_controllers";
import type * as findRestaurants from "../findRestaurants";
import type * as preferences_general from "../preferences/general";
import type * as restaurants from "../restaurants";
import type * as tasks from "../tasks";
import type * as users_general from "../users/general";
import type * as users_preferences from "../users/preferences";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "controllers/suggestions_controllers": typeof controllers_suggestions_controllers;
  findRestaurants: typeof findRestaurants;
  "preferences/general": typeof preferences_general;
  restaurants: typeof restaurants;
  tasks: typeof tasks;
  "users/general": typeof users_general;
  "users/preferences": typeof users_preferences;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
