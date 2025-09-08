


// // utils/cloudFlare/r2Client.js
// const { S3Client } = require("@aws-sdk/client-s3");
// const dotenv = require("dotenv");
// dotenv.config(); // Ensure dotenv is initialized here to load environment variables

// // // --- ADD THESE CONSOLE.LOGS ---
// // console.log("--- R2 Client Configuration Check ---");
// // console.log("CLOUDFLARE_ACCOUNT_ID:", process.env.CLOUDFLARE_ACCOUNT_ID);
// // console.log("CLOUDFLARE_ACCESS_KEY_ID:", process.env.CLOUDFLARE_ACCESS_KEY_ID);
// // console.log("CLOUDFLARE_BUCKET_NAME:", process.env.CLOUDFLARE_BUCKET_NAME);
// // console.log("Constructed Endpoint:", `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`);
// // console.log("--- End R2 Client Configuration Check ---");
// // // --- END CONSOLE.LOGS ---

// // const r2Client = new S3Client({
// //     region: "auto",
// //     endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
// //     credentials: {
// //         accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
// //         secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
// //     },
// // });

// // module.exports = r2Client;

// // const { S3Client } = require("@aws-sdk/client-s3");

// const r2Client = new S3Client({
//     region: "auto",
//     // ✅ FIX: Use backticks for the template literal
//     endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
//     credentials: {
//         accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
//         secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
//     },
// });

// module.exports = r2Client;

import { S3Client } from "@aws-sdk/client-s3";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// --- Optional Debug Logs ---
// console.log("--- R2 Client Configuration Check ---");
// console.log("CLOUDFLARE_ACCOUNT_ID:", process.env.CLOUDFLARE_ACCOUNT_ID);
// console.log("CLOUDFLARE_ACCESS_KEY_ID:", process.env.CLOUDFLARE_ACCESS_KEY_ID);
// console.log("CLOUDFLARE_BUCKET_NAME:", process.env.CLOUDFLARE_BUCKET_NAME);
// console.log("Constructed Endpoint:", `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`);
// console.log("--- End R2 Client Configuration Check ---");

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
  },
});

export default r2Client;
