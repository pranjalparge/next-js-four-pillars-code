
// // module.exports = { getGeminiReply };
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const fs = require("fs");
// const pdf = require("pdf-parse");
// const path = require("path");

// const API_KEY = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(API_KEY);

// const PDF_PATH = path.join(__dirname, "Products_SERVICES_merged_compressed.pdf");

// let chunks = [];
// const stopwords = new Set([
//   "the", "is", "at", "which", "on", "a", "an", "and", "or", "to", "with", "for", "of", "in"
// ]);

// async function fetchPdfChunks(pdfPath, chunkSize = 1000, overlap = 200) {
//   const dataBuffer = fs.readFileSync(pdfPath);
//   const data = await pdf(dataBuffer);

//   const normalizedText = data.text.replace(/\r?\n|\r/g, " ").replace(/\s+/g, " ").toLowerCase();

//   const chunks = [];
//   let start = 0;

//   while (start < normalizedText.length) {
//     const end = Math.min(start + chunkSize, normalizedText.length);
//     const chunk = normalizedText.slice(start, end);
//     chunks.push(chunk);
//     if (end === normalizedText.length) break;
//     start = end - overlap;
//   }

//   return chunks;
// }

// (async () => {
//   try {
//     chunks = await fetchPdfChunks(PDF_PATH);
//     console.log("✅ PDF loaded and chunked. Total chunks:", chunks.length);
//   } catch (err) {
//     console.error("❌ Failed to load PDF:", err.message);
//   }
// })();

// function scoreChunk(chunk, query) {
//   const queryWords = query
//     .toLowerCase()
//     .split(/\W+/)
//     .filter(w => w && !stopwords.has(w));

//   let score = 0;
//   for (const word of queryWords) {
//     const re = new RegExp(`\\b${word}\\b`, "g");
//     const matches = chunk.match(re);
//     if (matches) score += matches.length;
//   }
//   return score;
// }

// function findRelevantChunks(query, limit = 3) {
//   const scored = chunks.map(chunk => ({
//     text: chunk,
//     score: scoreChunk(chunk, query)
//   }));

//   scored.sort((a, b) => b.score - a.score);
//   const filtered = scored.filter(c => c.score > 0);

//   return filtered.slice(0, limit).map(c => c.text);
// }

// async function getGeminiReply(question) {
//   try {
//     if (chunks.length === 0) {
//       return "Sorry, product information is currently loading. Please try again shortly.";
//     }

//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const topChunks = findRelevantChunks(question);
//     console.log("📄 Selected PDF Chunks:\n", topChunks);

//     if (topChunks.length === 0) {
//       return "I'm sorry, I couldn't find relevant information in our documents. Please refer to the website for all product and service details.";
//     }

//     const context = topChunks.join("\n\n");
//     const prompt = `You are a chatbot for 4Pillars Infotech. Use ONLY the extracted content below to answer the user's question accurately.\n\n${context}\n\nUser question: ${question}`;

//     const result = await model.generateContent(prompt);
//     const response = result.response;

//     const reply = response.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find the answer.";
//     return typeof reply === "string" ? reply : String(reply);
//   } catch (err) {
//     console.error("Gemini reply error:", err.message);
//     return "Sorry, something went wrong while fetching the response.";
//   }
// }

// module.exports = { getGeminiReply };


// // utils/botReply.js
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const axios = require("axios");
// const cheerio = require("cheerio");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Scrape main website content (you can expand this to crawl more pages)
// async function scrapeWebsite(url) {
//   try {
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);
//     const visibleText = $("body").text().replace(/\s+/g, " ").trim();
//     return visibleText;
//   } catch (error) {
//     console.error("Scraping failed:", error.message);
//     return "";
//   }
// }

// async function getGeminiReply(userQuery) {
//   const siteContent = await scrapeWebsite("https://www.4pillarsinfotechindia.com");

//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = `
// You are a helpful AI for 4Pillars Infotech. The user has asked:

// "${userQuery}"

// Use the following content from the company website to answer:

// ${siteContent}
// `;

//   const result = await model.generateContent(prompt);
//   const response = result.response;
//   return response.text();
// }

// module.exports = { getGeminiReply };


const axios = require("axios");
const cheerio = require("cheerio");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let cachedContent = null;

async function scrapeWebsite(url) {
  if (cachedContent) return cachedContent;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const text = $("body").text().replace(/\s+/g, " ").trim();
    cachedContent = text.slice(0, 30000); // Gemini input limit
    return cachedContent;
  } catch (err) {
    console.error("Error scraping website:", err.message);
    return "Website content could not be loaded.";
  }
}

async function getGeminiReply(userQuestion) {
  const content = await scrapeWebsite("https://www.4pillarsinfotechindia.com/4pillars");

  const prompt = `
You are a helpful AI assistant for 4Pillars Infotech. Answer the user's question based ONLY on the website content below.

--- Website Content Start ---
${content}
--- Website Content End ---

User Question: ${userQuestion}
`.trim();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  // const result = await model.generateContent([prompt]);
  // return result.response.text();
  const result = await model.generateContent([prompt]);
const responseText = result.response.text();

if (responseText.includes("Please provide me with the content from the 4Pillars Infotech website")) {
  return "Sorry, please refer the company website https://www.4pillarsinfotechindia.com";
}

return responseText;

}

module.exports = { getGeminiReply };
