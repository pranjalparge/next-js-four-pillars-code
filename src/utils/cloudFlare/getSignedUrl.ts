// const { GetObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const r2Client = require("./r2Client");

// const generateSignedUrl = async (key, expiresIn = 60 * 5) => {
//   const command = new GetObjectCommand({
//     Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
//     Key: key,
//   });

//   const signedUrl = await getSignedUrl(r2Client, command, { expiresIn });
//   return signedUrl;
// };

// module.exports = generateSignedUrl;

// import { GetObjectCommand }from require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
// const r2Client = require("./r2Client");

// const generateSignedUrl = async (key, expiresIn = 3600) => {
//   const bucketName = process.env.CLOUDFLARE_BUCKET_NAME;
//   const command = new GetObjectCommand({
//     Bucket: bucketName,
//     Key: key,
//   });

//   const signedUrl = await getSignedUrl(r2Client, command, { expiresIn });
//   return signedUrl;
// };

// module.exports = {generateSignedUrl};

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import r2Client from "./r2Client"; // assumes r2Client.ts has `export default`

export const generateSignedUrl = async (
  key: string,
  expiresIn: number = 3600
): Promise<string> => {
  const bucketName = process.env.CLOUDFLARE_BUCKET_NAME as string;

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  const signedUrl = await getSignedUrl(r2Client, command, { expiresIn });
  return signedUrl;
};
