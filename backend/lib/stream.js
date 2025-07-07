import { StreamChat } from "stream-chat";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or secret is missing.");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (err) {
    console.error("Error upserting Stream user:", err);
  }
};

export const generateStreamToken = async (userId) => {
  try {
    //ensure userId is a string
    const userIdStr = userId.toString();


    const token = streamClient.createToken(userIdStr);
    
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error;
  }
};
