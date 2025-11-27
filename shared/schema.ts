import { z } from "zod";

export const messageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.number(),
});

export const conversationSchema = z.object({
  id: z.string(),
  messages: z.array(messageSchema),
  createdAt: z.number(),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1),
  conversationId: z.string().optional(),
  history: z.array(messageSchema).optional(),
});

export const chatResponseSchema = z.object({
  message: messageSchema,
  conversationId: z.string(),
});

export type Message = z.infer<typeof messageSchema>;
export type Conversation = z.infer<typeof conversationSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
