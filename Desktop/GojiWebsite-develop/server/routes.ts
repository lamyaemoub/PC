import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { waitlistSchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Cache the welcome message audio buffer
let cachedWelcomeAudio: Buffer | null = null;

const welcomeMessage = "Hi, welcome to goji. Let me show you how I can engage with your visitors to tailor personalized demos for their specific use cases, and help you qualify and convert before your sales teams even join the call. Click on \"Start demo\" to get started.";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  app.post("/api/waitlist", async (req, res) => {
    try {
      const data = waitlistSchema.parse(req.body);

      const existingUser = await storage.getUserByUsername(data.email);
      if (existingUser) {
        return res.status(200).json({ message: "Successfully joined waitlist!" });
      }

      await storage.createUser({
        username: data.email,
        password: "waitlist-" + Math.random().toString(36),
        email: data.email
      });

      res.status(201).json({ message: "Successfully joined waitlist!" });
    } catch (error) {
      res.status(400).json({ message: "Invalid data provided" });
    }
  });

  app.get("/api/welcome-audio", async (req, res) => {
    try {
      if (cachedWelcomeAudio) {
        console.log("Serving cached welcome audio...");
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', cachedWelcomeAudio.length);
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        return res.send(cachedWelcomeAudio);
      }

      console.log("Generating audio for welcome message...");
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: welcomeMessage,
      });

      console.log("Converting audio to buffer...");
      cachedWelcomeAudio = Buffer.from(await mp3.arrayBuffer());

      console.log("Sending audio response...");
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', cachedWelcomeAudio.length);
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.send(cachedWelcomeAudio);
    } catch (error) {
      console.error('Error generating welcome audio:', error);
      res.status(500).json({ message: "Failed to generate welcome message" });
    }
  });
  
  // API endpoint to get all waitlist users
  app.get("/api/admin/waitlist", async (req, res) => {
    try {
      // In a production app, you would add proper authentication here
      // to ensure only admins can access this endpoint
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const waitlistUsers = await storage.getWaitlistUsers();
      
      // Remove sensitive information like passwords before sending the response
      const safeUsers = waitlistUsers.map(user => {
        return {
          id: user.id,
          email: user.username,
          joinedAt: user.createdAt?.toISOString() || new Date().toISOString()
        };
      });
      
      res.status(200).json(safeUsers);
    } catch (error) {
      console.error('Error fetching waitlist users:', error);
      res.status(500).json({ message: "Failed to fetch waitlist users" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}