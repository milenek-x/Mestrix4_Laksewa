// src/molecules/MessageDetail.tsx

"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft } from "lucide-react"; // Import ArrowLeft icon

// Import types from the organism file
import { MessageDetailProps, Message } from "../organisms/CommunicationModule"; // Adjust path as needed

export function MessageDetail({ conversation, onBack }: MessageDetailProps) { // Add onBack to props
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
      <div className="flex items-center space-x-3 border-b p-4 bg-[#0E3A6F]">
        {/* Back button added here */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack} // Call onBack function when clicked
          className="text-white hover:bg-transparent hover:text-white cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-col">
          <span className="font-extrabold text-white">{conversation.name}</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {conversation.detailMessages.map((message: Message) => (
          <div
            key={message.id}
            className={`mb-4 flex text-left ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] text-left rounded-lg p-3 relative flex flex-col ${ // Added relative class
                message.isUser
                  ? "bg-[#0E3A6F] text-primary-foreground speech-bubble-user" // Added speech-bubble-user class
                  : "bg-app-login text-white speech-bubble-other" // Added speech-bubble-other class
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span
                className={`mt-1 self-end text-xs ${
                  message.isUser ? "text-primary-foreground/80" : "text-white/80"
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
        <Button type="submit" className="bg-[#0E3A6F]" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}