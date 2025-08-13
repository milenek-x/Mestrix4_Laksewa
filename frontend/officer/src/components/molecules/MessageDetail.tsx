// src/molecules/MessageDetail.tsx

"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

// Import types from the organism file
import { MessageDetailProps, Message } from "../organisms/CommunicationModule"; // Adjust path as needed

export function MessageDetail({ conversation }: MessageDetailProps) {
  React.useEffect(() => {
    const messagesEndRef = document.getElementById("messages-end");
    if (messagesEndRef) {
      messagesEndRef.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center text-muted-foreground">
        Select a conversation to view messages.
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center space-x-3 border-b p-4">
        <div className="flex flex-col">
          <span className="font-medium">{conversation.name}</span>
          {/* Removed the subject line here */}
          {/* <span className="text-sm text-muted-foreground">
            {conversation.subject}
          </span> */}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {conversation.detailMessages.map((message: Message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span
                className={`mt-1 block text-xs ${
                  message.isUser ? "text-primary-foreground/80" : "text-muted-foreground/80"
                }`}
              >
                {message.time}
              </span>
            </div>
          </div>
        ))}
        <div id="messages-end" />
      </div>
      <div className="border-t p-4 flex items-center space-x-2">
        <Input
          placeholder="Type your message here..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}