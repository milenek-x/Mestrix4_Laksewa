// src/molecules/ConversationList.tsx

"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useState } from "react"; // Import useState

// Import types from the organism file
import { Conversation, ConversationListProps } from "../organisms/CommunicationModule"; // Adjust path as needed

export function ConversationList({ conversations, selectedConversation, onSelectConversation, unreadFilter, onToggleUnreadFilter }: ConversationListProps) {
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  const filteredConversations: Conversation[] = conversations.filter((conv: Conversation) => {
    // Apply unread filter first
    const matchesUnreadFilter = unreadFilter ? conv.id === "conv-john" : true;

    // Apply name filter
    const matchesNameFilter = conv.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesUnreadFilter && matchesNameFilter;
  });

  return (
    <div className="flex w-[350px] min-w-[300px] flex-col border-r bg-muted/50 p-4">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Type to search..."
          className="pl-9"
          value={searchTerm} // Bind input value to searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on change
        />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Inbox</h3>
        <Label className="flex items-center gap-2 text-sm">
          <span>Unreads</span>
          <Switch
            checked={unreadFilter}
            onCheckedChange={onToggleUnreadFilter}
            className="shadow-none custom-switch-color"
          />
        </Label>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {filteredConversations.map((conversation: Conversation) => (
          <div
            key={conversation.id}
            className={`mb-2 flex cursor-pointer items-center space-x-3 rounded-md p-3 transition-colors ${
              selectedConversation?.id === conversation.id
                ? "bg-[#0E3A6F] text-white" // Applied custom primary color and white text
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-semibold truncate">{conversation.name}</span>
                <span className="text-xs text-muted-white">
                  {conversation.date}
                </span>
              </div>
              <p className="truncate text-sm text-muted-white">
                {conversation.lastMessageTeaser}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}