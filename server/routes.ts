import type { Express } from "express";
import { createServer, type Server } from "http";
import { chatRequestSchema } from "@shared/schema";
import { generateSteinerResponse } from "./openai";
import { randomUUID } from "crypto";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    try {
      const result = chatRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Ungültige Anfrage", 
          details: result.error.flatten() 
        });
      }

      const { message, conversationId, history } = result.data;

      const responseContent = await generateSteinerResponse(message, history || []);

      const responseMessage = {
        id: randomUUID(),
        role: "assistant" as const,
        content: responseContent,
        timestamp: Date.now(),
      };

      return res.json({
        message: responseMessage,
        conversationId: conversationId || randomUUID(),
      });
    } catch (error) {
      console.error("Chat API error:", error);
      return res.status(500).json({ 
        error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." 
      });
    }
  });

  return httpServer;
}
