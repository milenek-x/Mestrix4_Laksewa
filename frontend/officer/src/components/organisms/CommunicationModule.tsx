// src/organisms/CommunicationModule.tsx
"use client";

import * as React from "react";
import { ConversationList } from "../molecules/ConversationList";
import { MessageDetail } from "../molecules/MessageDetail";

// --- Type Definitions (moved here) ---
export interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isUser: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  subject: string;
  lastMessageTeaser: string;
  date: string;
  detailMessages: Message[];
}

export interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  unreadFilter: boolean;
  onToggleUnreadFilter: (checked: boolean) => void;
}

export interface MessageDetailProps {
  conversation: Conversation | null;
}
// --- End Type Definitions ---


// --- Sample Data (now explicitly typed) ---
const dummyConversations: Conversation[] = [
  {
    id: "conv-john",
    name: "John Smith",
    subject: "Passport Application Query",
    lastMessageTeaser: "Hello, I have a question about my passport application...",
    date: "10:30 AM",
    detailMessages: [
      {
        id: "msg-john-1",
        sender: "John Smith",
        content: "Hello, I have a question about my passport application. The portal says I need to submit a form, but I can't find it. Can you help me?",
        time: "10:28 AM",
        isUser: false,
      },
      {
        id: "msg-john-2",
        sender: "You",
        content: "Hello John. Can you please confirm the reference number of your application? I will check the status for you.",
        time: "10:30 AM",
        isUser: true,
      },
    ],
  },
  {
    id: "conv-maria",
    name: "Maria Garcia",
    subject: "Driver's License Status",
    lastMessageTeaser: "Is there an update on my license application?",
    date: "Yesterday",
    detailMessages: [
      {
        id: "msg-maria-1",
        sender: "Maria Garcia",
        content: "Hi, just following up on my driver's license application. Has there been any progress?",
        time: "Yesterday",
        isUser: false,
      },
      {
        id: "msg-maria-2",
        sender: "You",
        content: "Please provide your application ID, and I can look into it for you.",
        time: "Yesterday",
        isUser: true,
      },
    ],
  },
  {
    id: "conv-david",
    name: "David Lee",
    subject: "Document Upload Issue",
    lastMessageTeaser: "I can't seem to upload my documents...",
    date: "2 days ago",
    detailMessages: [
      {
        id: "msg-david-1",
        sender: "David Lee",
        content: "I can't seem to upload my documents for the birth certificate request. The button doesn't do anything.",
        time: "2 days ago",
        isUser: false,
      },
      {
        id: "msg-david-2",
        sender: "You",
        content: "Could you try clearing your browser cache or using a different browser? If the issue persists, please provide screenshots.",
        time: "2 days ago",
        isUser: true,
      },
    ],
  },
  {
    id: "conv-emily",
    name: "Emily Davis",
    subject: "Question about Budget",
    lastMessageTeaser: "I've reviewed the budget numbers you sent over.",
    date: "2 days ago",
    detailMessages: [{ id: "msg-emily-1", sender: "Emily Davis", content: "I've reviewed the budget numbers you sent over. Can we set up a quick call to discuss some potential adjustments?", time: "2 days ago", isUser: false }],
  },
  {
    id: "conv-michael",
    name: "Michael Wilson",
    subject: "Important Announcement",
    lastMessageTeaser: "Please join us for an all-hands meeting this Friday...",
    date: "1 week ago",
    detailMessages: [{ id: "msg-michael-1", sender: "Michael Wilson", content: "Please join us for an all-hands meeting this Friday at 3 PM. We have some exciting news to share about the company's future.", time: "1 week ago", isUser: false }],
  },
  {
    id: "conv-sarah",
    name: "Sarah Brown",
    subject: "Feedback on Proposal",
    lastMessageTeaser: "Thank you for sending over the proposal...",
    date: "1 week ago",
    detailMessages: [{ id: "msg-sarah-1", sender: "Sarah Brown", content: "Thank you for sending over the proposal. I've reviewed it and have some thoughts. Could we schedule a meeting to discuss my feedback in detail?", time: "1 week ago", isUser: false }],
  },
];

export function CommunicationModule() {
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(dummyConversations[0]);
  const [unreadFilter, setUnreadFilter] = React.useState<boolean>(false);

  return (
    <div className="flex h-[calc(100vh-100px)] min-h-[600px] flex-1 overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
      <ConversationList
        conversations={dummyConversations}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
        unreadFilter={unreadFilter}
        onToggleUnreadFilter={setUnreadFilter}
      />
      <MessageDetail
        conversation={selectedConversation}
      />
    </div>
  );
}