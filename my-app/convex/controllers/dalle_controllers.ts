// import { action } from "../_generated/server";
// // import OpenAI from "openai";
// import Configuration from "openai";
// import OpenAIApi from "openai"
// import fetch from "node-fetch";
// import { v } from "convex/values";


// export const createDallE = action({
//   args: { prompt: v.string() },  // Assuming the prompt is a string
//   handler: async (ctx, args) => {
//     const prompt = args.prompt;

//     // Print the received prompt
//     console.log("Received prompt:", prompt); // success

//     // Step 0: Configure client 
//     "use node";
//     const configuration = new Configuration({
//       apiKey: process.env.OPENAI_API_KEY,
//     });


//     const openai = new OpenAIApi(configuration);

//     console.log(openai)




//     // here





//     // // Step 1: Check the prompt with the Moderation API
//     // const modResponse = await openai.createModeration({ input: prompt });
//     // const modResult = modResponse.data.results[0];
//     // if (modResult.flagged) {
//     //   console.log("Prompt was flagged:", JSON.stringify(modResult.categories));
//     //   throw new Error(`Your prompt was flagged: ${JSON.stringify(modResult.categories)}`);
//     // } else {
//     //   console.log("Prompt passed moderation.");
//     // }

// //     // Step 2: Generate an image using Dall-E
// //     const opanaiResponse = await openai.createImage({
// //       prompt,
// //       n: 1,
// //       size: "256x256",
// //     });
// //     const dallEImageUrl = opanaiResponse.data.data[0]["url"];
// //     console.log("Generated DALL·E Image URL:", dallEImageUrl);

// //     // Step 3: Download the image
// //     const imageResponse = await fetch(dallEImageUrl);
// //     const image = await imageResponse.blob();
// //     console.log("Image fetched.");

// //     // Step 4: Store the image in Convex
// //     const storageId = await ctx.storage.store(image);
// //     const permanentImageUrl = await ctx.storage.getUrl(storageId);
// //     console.log("Image stored with URL:", permanentImageUrl);

// //     return permanentImageUrl;
//   },
// });
