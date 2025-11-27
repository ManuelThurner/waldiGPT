import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send, Plus, Loader2, BookOpen, Sparkles, GraduationCap, Palette } from "lucide-react";
import type { Message, ChatResponse } from "@shared/schema";

const SUGGESTED_QUESTIONS = [
  {
    icon: GraduationCap,
    title: "Waldorfpädagogik",
    question: "Wie unterscheidet sich die Waldorfpädagogik von anderen Erziehungsansätzen?",
  },
  {
    icon: Sparkles,
    title: "Entwicklungsphasen",
    question: "Welche Entwicklungsphasen durchläuft das Kind und wie sollte die Erziehung darauf eingehen?",
  },
  {
    icon: BookOpen,
    title: "Anthroposophie",
    question: "Was ist das Wesen der Anthroposophie und wie beeinflusst sie die Pädagogik?",
  },
  {
    icon: Palette,
    title: "Künstlerische Erziehung",
    question: "Warum spielen Kunst und Handwerk eine so zentrale Rolle in der Waldorfschule?",
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-start gap-4 mr-auto max-w-2xl" data-testid="typing-indicator">
      <Avatar className="h-10 w-10 border border-border">
        <AvatarFallback className="bg-primary/10 text-primary font-serif text-sm">RS</AvatarFallback>
      </Avatar>
      <div className="rounded-2xl rounded-tl-sm border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end" data-testid={`message-user-${message.id}`}>
        <div className="ml-auto max-w-2xl rounded-2xl rounded-tr-sm bg-primary text-primary-foreground p-4 shadow-sm">
          <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 mr-auto max-w-2xl" data-testid={`message-assistant-${message.id}`}>
      <Avatar className="h-10 w-10 border border-border flex-shrink-0">
        <AvatarFallback className="bg-primary/10 text-primary font-serif text-sm">RS</AvatarFallback>
      </Avatar>
      <div className="rounded-2xl rounded-tl-sm border bg-card p-4 shadow-sm">
        <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}

function WelcomeScreen({ onQuestionClick }: { onQuestionClick: (question: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-8" data-testid="welcome-screen">
      <div className="max-w-2xl text-center space-y-6">
        <Avatar className="h-20 w-20 mx-auto border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary font-serif text-2xl">RS</AvatarFallback>
        </Avatar>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold font-serif text-foreground" data-testid="text-welcome-title">
            Guten Tag, ich bin Rudolf Steiner
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Ich freue mich, mit Ihnen über die Waldorfpädagogik, die Anthroposophie und die ganzheitliche 
            Entwicklung des Menschen zu sprechen. Stellen Sie mir gerne Ihre Fragen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          {SUGGESTED_QUESTIONS.map((item, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover-elevate active-elevate-2 transition-all duration-150 text-left"
              onClick={() => onQuestionClick(item.question)}
              data-testid={`card-suggestion-${index}`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.question}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | undefined>();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        message,
        conversationId,
        history: messages,
      });
      const data: ChatResponse = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, data.message]);
      setConversationId(data.conversationId);
    },
    onError: (error: Error) => {
      toast({
        title: "Fehler",
        description: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
      console.error("Chat error:", error);
    },
  });

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatMutation.isPending]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || chatMutation.isPending) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedInput,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    chatMutation.mutate(trimmedInput);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewConversation = () => {
    setMessages([]);
    setConversationId(undefined);
    setInput("");
    textareaRef.current?.focus();
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
    textareaRef.current?.focus();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex-shrink-0 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center justify-between h-full px-4 md:px-6 max-w-4xl mx-auto w-full gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarFallback className="bg-primary/10 text-primary font-serif text-xs">RS</AvatarFallback>
            </Avatar>
            <h1 className="font-serif font-semibold text-lg text-foreground" data-testid="text-header-title">
              Rudolf Steiner Assistent
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewConversation}
            className="gap-2"
            data-testid="button-new-conversation"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Neues Gespräch</span>
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        {messages.length === 0 ? (
          <WelcomeScreen onQuestionClick={handleSuggestionClick} />
        ) : (
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {chatMutation.isPending && <TypingIndicator />}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-3">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Stellen Sie Rudolf Steiner eine Frage über Waldorfpädagogik..."
                className="min-h-12 max-h-32 resize-none pr-12 text-base leading-relaxed"
                disabled={chatMutation.isPending}
                data-testid="input-message"
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || chatMutation.isPending}
              size="icon"
              className="flex-shrink-0"
              aria-label="Nachricht senden"
              data-testid="button-send"
            >
              {chatMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            KI-generierte Antworten basieren auf Rudolf Steiners Lehren und der Waldorfpädagogik
          </p>
        </div>
      </div>
    </div>
  );
}
