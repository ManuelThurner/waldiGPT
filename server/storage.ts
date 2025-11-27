import type { Conversation, Message } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getConversation(id: string): Promise<Conversation | undefined>;
  createConversation(): Promise<Conversation>;
  addMessage(conversationId: string, message: Message): Promise<void>;
}

export class MemStorage implements IStorage {
  private conversations: Map<string, Conversation>;

  constructor() {
    this.conversations = new Map();
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async createConversation(): Promise<Conversation> {
    const id = randomUUID();
    const conversation: Conversation = {
      id,
      messages: [],
      createdAt: Date.now(),
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async addMessage(conversationId: string, message: Message): Promise<void> {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.messages.push(message);
    }
  }
}

export const storage = new MemStorage();
