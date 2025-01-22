//import  ConfigDotenv after installing dotenv
import { configDotenv } from "dotenv";
configDotenv()

//import GoogleGenerativeAI after installing @google/generative-ai, by running [[npm install @google/generative-ai]]
import {GoogleGenerativeAI} from "@google/generative-ai";

//store apikey in .env file in root directory, 
//call and store it like so👇
const apiKey = process.env.VITE_GEMINI_API_KEY;

//throw error if api key isnt found, so you can check env wellas
if (!apiKey) {
  throw new Error("API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.");
}

//initialize GGenerativeAI with the api key like so 👇 
const genAI = new GoogleGenerativeAI(apiKey);

//get and store model in a variable so you can use it easily
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

//an asynchronous function that will take in prompts as input, sends the input as message to Gemini and give out response when called
async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    console.log(await result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

// run();
export default run;