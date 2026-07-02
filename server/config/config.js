/**
 * Configuration globale du serveur
 */
import dotenv from "dotenv";
dotenv.config();

export const PORT = 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
