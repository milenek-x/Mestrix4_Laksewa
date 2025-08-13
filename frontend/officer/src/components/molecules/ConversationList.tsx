// src/molecules/ConversationList.tsx

"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

// Import types from the organism file
import { Conversation, ConversationListProps } from "../organisms/CommunicationModule"; // Adjust path as needed

export function ConversationList({ conversations, selectedConversation, onSelectConversation, unreadFilter, onToggleUnreadFilter }: ConversationListProps) {
  const filteredConversations: Conversation[] = unreadFilter
    ? conversations.filter((conv: Conversation) => conv.id === "conv-john")
    : conversations;

  return (
    <div className="flex w-[350px] min-w-[300px] flex-col border-r bg-muted/50 p-4">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Type to search..." className="pl-9" />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Inbox</h3>
        <Label className="flex items-center gap-2 text-sm">
          <span>Unreads</span>
          <Switch
            checked={unreadFilter}
            onCheckedChange={onToggleUnreadFilter}
            className="shadow-none"
          />
        </Label>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {filteredConversations.map((conversation: Conversation) => (
          <div
            key={conversation.id}
            className={`mb-2 flex cursor-pointer items-center space-x-3 rounded-md p-3 transition-colors ${
              selectedConversation?.id === conversation.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-medium truncate">{conversation.name}</span>
                <span className="text-xs text-muted-foreground">
                  {conversation.date}
                </span>
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {conversation.lastMessageTeaser}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}