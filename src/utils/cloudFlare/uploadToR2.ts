
// // const { PutObjectCommand } = require("@aws-sdk/client-s3");
// // const r2 = require("./r2Client"); // from earlier R2 config
// // const path = require("path");

// // const uploadToR2 = async (file, prefix = "") => {
// //   if (!file) return "";

// //   const ext = path.extname(file.originalname);
// //   const filename = `${prefix}${Date.now()}-4pii-${file.originalname}`;
// //   const command = new PutObjectCommand({
// //     Bucket: process.env.R2_BUCKET,
// //     Key: filename,
// //     Body: file.buffer,
// //     ContentType: file.mimetype,
// //   });

// //   await r2.send(command);
// //   return `${process.env.R2_PUBLIC_URL}/${filename}`;
// // };

// // module.exports = uploadToR2;



// // // utils/cloudFlare/uploadToR2.js
// // const { PutObjectCommand } = require("@aws-sdk/client-s3");
// // const r2Client = require("./r2Client"); // Your R2 client instance

// // const uploadToR2 = async (file, folderPrefix = '') => {
// //     const bucketName = process.env.CLOUDFLARE_BUCKET_NAME;
// //     // FIX 1: Remove span tags and math-inline class from the key
// //     const key = `${folderPrefix}${Date.now()}-4pii-${file.originalname}`; // Example key naming

// //     const uploadParams = {
// //         Bucket: bucketName,
// //         Key: key,
// //         Body: file.buffer,
// //         ContentType: file.mimetype,
// //     };

// //     await r2Client.send(new PutObjectCommand(uploadParams));

// //     // FIX 2: Remove span tags and math-inline class from the return URL
// //     return `https://${bucketName}.${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
// // };

// // module.exports = uploadToR2;

// const { PutObjectCommand } = require("@aws-sdk/client-s3");
// const r2Client = require("./r2Client"); // Your R2 client instance

// const uploadToR2 = async (file, folderPrefix = '') => {
//     const bucketName = process.env.CLOUDFLARE_BUCKET_NAME;
    
//     const key = `${folderPrefix}${Date.now()}-4pii-${file.originalname}`; // Example key naming

//     const uploadParams = {
//         Bucket: bucketName,
//         Key: key,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//     };

//     const instance = await r2Client.send(new PutObjectCommand(uploadParams));

//     // ✅ FIX: Use the public R2 domain for the return URL
//     // This assumes your bucket 'node-website-fpii' has public access enabled.
//     // return `https://pub-${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${bucketName}/${key}`;
//     const url = `https://${bucketName}.r2.dev/${key}`
//     return {url,instance}

// };

// module.exports = uploadToR2;


// utils/cloudFlare/uploadToR2.js
// const { PutObjectCommand } = require("@aws-sdk/client-s3");
// const r2Client = require("./r2Client");

// const uploadToR2 = async (file, folderPrefix = '') => {
//   const bucketName = process.env.CLOUDFLARE_BUCKET_NAME;

//   const safeFileName = file.originalname.replace(/\s+/g, '_').replace(/[^\w.-]/g, '');
//   const key = `${folderPrefix}${Date.now()}-4pii-${safeFileName}`;

//   const uploadParams = {
//     Bucket: bucketName,
//     Key: key,
//     Body: file.buffer,
//     ContentType: file.mimetype || 'application/octet-stream',
//   };

//   await r2Client.send(new PutObjectCommand(uploadParams));
//   return key;
// };

// module.exports = uploadToR2;
// utils/cloudflare/uploadFolderToR2.js
// const fs = require('fs');
// const path = require('path');
// const mime = require('mime-types');
// const { PutObjectCommand } = require('@aws-sdk/client-s3');
// const r2Client = require('./r2Client');

// const uploadFolderToR2 = async (localFolder, r2Prefix = 'json/') => {
//   const files = fs.readdirSync(localFolder);
//   const uploaded = [];

//   for (const file of files) {
//     const filePath = path.join(localFolder, file);
//     const body = fs.readFileSync(filePath);

//     const contentType = mime.lookup(file) || 'application/octet-stream';

//     const key = `${r2Prefix}${file}`;

//     await r2Client.send(new PutObjectCommand({
//       Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
//       Key: key,
//       Body: body,
//       ContentType: contentType,
//     }));

//     const fileUrl = `https://pub-${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${process.env.CLOUDFLARE_BUCKET_NAME}/${key}`;
//     console.log('✅ Uploaded:', fileUrl);
//     uploaded.push(fileUrl);
//   }

//   return uploaded;
// };

// module.exports = uploadFolderToR2;


// utils/cloudflare/uploadFolderToR2.js

// const fs = require('fs');
// const path = require('path');
// const mime = require('mime-types');
// const { PutObjectCommand } = require('@aws-sdk/client-s3');
// const r2Client = require('./r2Client');

// const uploadFolderToR2 = async (localFolder, r2Prefix = 'json/') => {
//   console.log("📂 Local folder to upload:", localFolder);

//   if (!fs.existsSync(localFolder)) {
//     throw new Error(`❌ Folder not found: ${localFolder}`);
//   }

//   const files = fs.readdirSync(localFolder);
//   const uploaded = [];

//   console.log("📄 Files to upload:", files);

//   for (const file of files) {
//     try {
//       const filePath = path.join(localFolder, file);
//       const body = fs.readFileSync(filePath);
//       const contentType = mime.lookup(file) || 'application/octet-stream';
//       const key = `${r2Prefix}${file}`;

//       console.log(`📤 Uploading ${file} as ${key} (${contentType})`);

//       await r2Client.send(new PutObjectCommand({
//         Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
//         Key: key,
//         Body: body,
//         ContentType: contentType,
//       }));

//       const fileUrl = `https://pub-${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${process.env.CLOUDFLARE_BUCKET_NAME}/${key}`;
//       console.log('✅ Uploaded:', fileUrl);

//       uploaded.push(fileUrl);
//     } catch (uploadErr) {
//       console.error(`❌ Failed to upload ${file}:`, uploadErr.message);
//     }
//   }

//   return uploaded;
// };

// module.exports = uploadFolderToR2;


// const fs = require('fs');
// const path = require('path');
// const mime = require('mime-types');
// const { PutObjectCommand } = require('@aws-sdk/client-s3');
// const r2Client = require('./r2Client'); // Make sure this exports a valid R2 S3 client

// const uploadFolderToR2 = async (localFolder, r2Prefix = 'json/') => {
//   try {
//     console.log(`📂 Local folder to upload: ${localFolder}`);
    
//     const files = fs.readdirSync(localFolder);
//     console.log(`📄 Files to upload:`, files);

//     const uploaded = [];

//     for (const file of files) {
//       const filePath = path.join(localFolder, file);
//       const body = fs.readFileSync(filePath);

//       const contentType = mime.lookup(file) || 'application/octet-stream';
//       const key = `${r2Prefix}${file}`;

//       console.log(`📤 Uploading ${file} as ${key} (${contentType})`);

//       try {
//         await r2Client.send(new PutObjectCommand({
//           Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
//           Key: key,
//           Body: body,
//           ContentType: contentType,
//         }));

//         const fileUrl = `https://pub-${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${process.env.CLOUDFLARE_BUCKET_NAME}/${key}`;
//         console.log('✅ Uploaded:', fileUrl);
//         uploaded.push(fileUrl);
//       } catch (err) {
//         console.error(`❌ Failed to upload ${file}:`, err.message);
//       }
//     }

//     return uploaded;
//   } catch (err) {
//     console.error('❌ Folder Upload Error:', err.message);
//     throw err;
//   }
// };

// module.exports = uploadFolderToR2;



// const fs = require('fs');
// const path = require('path');
// const mime = require('mime-types');
// const { PutObjectCommand } = require('@aws-sdk/client-s3');
// const r2Client = require('./r2Client');

// const uploadFolderToR2 = async (localFolder, r2Prefix = 'json/') => {
//   const files = fs.readdirSync(localFolder);
//   const uploaded = [];

//   console.log(`📂 Local folder to upload: ${localFolder}`);
//   console.log(`📄 Files to upload:`, files);

//   for (const file of files) {
//     const filePath = path.join(localFolder, file);
//     const body = fs.readFileSync(filePath);
//     const contentType = mime.lookup(file) || 'application/octet-stream';
//     const key = `${r2Prefix}${file}`;

//     console.log(`📤 Uploading ${file} as ${key} (${contentType})`);

//     const uploadParams = {
//       Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
//       Key: key,
//       Body: body,
//       ContentType: contentType,
//     };

//     try {
//       await r2Client.send(new PutObjectCommand(uploadParams));

//       const fileUrl = `https://pub-${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${process.env.CLOUDFLARE_BUCKET_NAME}/${key}`;
//       console.log('✅ Uploaded:', fileUrl);
//       uploaded.push(fileUrl);
//     } catch (error) {
//       console.error(`❌ Failed to upload ${file}:`, error.message);
//     }
//   }

//   return uploaded;
// };

// module.exports = uploadFolderToR2;


// const fs = require('fs');
// const path = require('path');
// const mime = require('mime-types');
// const { PutObjectCommand } = require('@aws-sdk/client-s3');
// const r2Client = require('./r2Client');

// const uploadFolderToR2 = async (localFolder, r2Prefix = 'json/') => {
//   const files = fs.readdirSync(localFolder);
//   const uploaded = [];

//   console.log(`📂 Local folder to upload: ${localFolder}`);
//   console.log(`📄 Files to upload:`, files);

//   for (const file of files) {
//     try {
//       const filePath = path.join(localFolder, file);
//       const body = fs.readFileSync(filePath);
//       const contentType = mime.lookup(file) || 'application/octet-stream';
//       const key = `${r2Prefix}${file}`;

//       console.log(`📤 Uploading ${file} as ${key} (${contentType})`);
//       console.log('⏳ Sending upload command to R2...');

//       // 🧠 Add timeout to catch hanging
//       const result = await Promise.race([
//         r2Client.send(new PutObjectCommand({
//           Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
//           Key: key,
//           Body: body,
//           ContentType: contentType,
//         })),
//         new Promise((_, reject) =>
//           setTimeout(() => reject(new Error('⏰ Upload timeout after 10s')), 10000)
//         )
//       ]);

//       console.log('✅ R2 Upload response:', result);
//       const fileUrl = `https://pub-${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${process.env.CLOUDFLARE_BUCKET_NAME}/${key}`;
//       console.log('✅ Uploaded:', fileUrl);
//       uploaded.push(fileUrl);
//     } catch (err) {
//       console.error(`❌ Error uploading ${file}:`, err.message || err);
//     }
//   }

//   return uploaded;
// };

// module.exports = uploadFolderToR2;

import { PutObjectCommand } from "@aws-sdk/client-s3";

import r2Client from "./r2Client";

// Define the type for file (similar to Multer's File)
interface UploadFile {
  originalname: string;
  buffer: Buffer;
  mimetype?: string;
}

const uploadToR2 = async (
  file: UploadFile,
  folderPrefix: string = ""
): Promise<string> => {
  const bucketName = process.env.CLOUDFLARE_BUCKET_NAME;

  if (!bucketName) {
    throw new Error("CLOUDFLARE_BUCKET_NAME is not defined in environment variables");
  }

  // ✅ Ensure safe filename
  const safeFileName = file.originalname
    .replace(/\s+/g, "_")
    .replace(/[^\w.-]/g, "");

  const key = `${folderPrefix}${Date.now()}-4pii-${safeFileName}`;

  const uploadParams = {
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype || "application/octet-stream",
  };

  await r2Client.send(new PutObjectCommand(uploadParams));
  return key;
};

export default uploadToR2;
