// src/organisms/CommunicationModule.tsx
"use client";

import * as React from "react";
import { ConversationList } from "../molecules/ConversationList";
import { MessageDetail } from "../molecules/MessageDetail";
import { useUser } from '../context/UserContext'; // Import useUser hook

// --- Type Definitions (moved here) ---
export interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isUser: boolean;
}

export interface Conversation {
  id: string; // This will now represent the user's ID for grouping
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
  onBack: () => void;
}
// --- End Type Definitions ---

export function CommunicationModule() {
  const { userData, userId } = useUser(); // Get userData and userId from UserContext
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(null);
  const [unreadFilter, setUnreadFilter] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // YOU_SENDER_ID will now be derived from userId from context
  const YOU_SENDER_ID = userId; 

  React.useEffect(() => {
    const fetchCommunicationData = async () => {
      // Only fetch if userData (and thus departmentId) is available
      if (!userData || !userData.departmentId) {
        setLoading(false);
        setConversations([]); // No conversations if no department to filter by
        return;
      }

      const currentUserDepartmentId = userData.departmentId;

      try {
        setLoading(true);

        // Fetch all necessary data
        const [
          conversationsResponse,
          messagesResponse,
          usersResponse,
          serviceRequestsResponse,
          servicesResponse, // Fetch services data
        ] = await Promise.all([
          fetch("http://localhost:5102/api/Conversation"),
          fetch("http://localhost:5102/api/Message"),
          fetch("http://localhost:5102/api/User"),
          fetch("http://localhost:5102/api/ServiceRequest"),
          fetch("http://localhost:5102/api/Service"), // New API call
        ]);

        if (!conversationsResponse.ok) throw new Error(`HTTP error! status: ${conversationsResponse.status} for conversations`);
        if (!messagesResponse.ok) throw new Error(`HTTP error! status: ${messagesResponse.status} for messages`);
        if (!usersResponse.ok) throw new Error(`HTTP error! status: ${usersResponse.status} for users`);
        if (!serviceRequestsResponse.ok) throw new Error(`HTTP error! status: ${serviceRequestsResponse.status} for service requests`);
        if (!servicesResponse.ok) throw new Error(`HTTP error! status: ${servicesResponse.status} for services`); // Error handling for services

        const conversationsData: any[] = await conversationsResponse.json();
        const messagesData: any[] = await messagesResponse.json();
        const usersData: any[] = await usersResponse.json();
        const serviceRequestsData: any[] = await serviceRequestsResponse.json();
        const servicesData: any[] = await servicesResponse.json(); // Get services data

        const usersMap = new Map(usersData.map(user => [user.id, user]));
        const serviceRequestsMap = new Map(serviceRequestsData.map(sr => [sr.id, sr]));
        const servicesMap = new Map(servicesData.map(service => [service.id, service])); // Map services by ID
        const conversationsByIdMap = new Map(conversationsData.map(conv => [conv.id, conv]));

        // Map to hold grouped conversations, keyed by sender's user ID
        const groupedConversations = new Map<string, Conversation>();

        // Process messages and group them by the sender (user)
        // Sort messages in descending order of timestamp for correct 'lastMessageTeaser' and 'date'
        messagesData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .forEach((msg) => {
            const conversationMeta = conversationsByIdMap.get(msg.conversationId);
            if (!conversationMeta) return; // Skip if no matching conversation meta found

            const serviceRequest = serviceRequestsMap.get(conversationMeta.serviceRequestId);
            const service = serviceRequest ? servicesMap.get(serviceRequest.serviceId) : null;

            // Filter logic: Only include conversations related to the current user's department
            if (!service || service.departmentId !== currentUserDepartmentId) {
              return; // Skip if service is not in the current user's department
            }

            const requestedByUser = serviceRequest ? usersMap.get(serviceRequest.requestedById) : null;
            const senderUser = usersMap.get(msg.senderId);

            const groupingKey = requestedByUser ? requestedByUser.id : msg.senderId;

            const senderName = msg.senderId === YOU_SENDER_ID
              ? "You"
              : (senderUser ? `${senderUser.firstName} ${senderUser.lastName}` : `Unknown User (${msg.senderId.substring(0, 4)})`);

            const message: Message = {
              id: msg.id,
              sender: senderName,
              content: msg.messageText,
              time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isUser: msg.senderId === YOU_SENDER_ID,
            };

            if (groupedConversations.has(groupingKey)) {
              const existingConv = groupedConversations.get(groupingKey)!;
              // Add message to existing conversation's detailMessages
              // Note: messagesData was sorted descending, so add to beginning to keep internal order ascending
              existingConv.detailMessages.unshift(message); 
              // Update last message teaser and date only if this is the most recent message for the group
              // (which it will be if messagesData was sorted correctly and we're processing in order)
              existingConv.lastMessageTeaser = message.content;
              existingConv.date = message.time;

            } else {
              // Create a new conversation entry for this user
              const conversationName = requestedByUser ? `${requestedByUser.firstName} ${requestedByUser.lastName}` : senderName;
              const subject = service ? `${service.name} Request` : `Conversation with ${conversationName}`; // Use service name as subject
              
              groupedConversations.set(groupingKey, {
                id: groupingKey,
                name: conversationName,
                subject: subject,
                lastMessageTeaser: message.content,
                date: message.time,
                detailMessages: [message],
              });
            }
          });

        const finalConversations = Array.from(groupedConversations.values()).sort((a, b) => {
            // Sort conversations by the date of their last message (most recent first)
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
        });

        setConversations(finalConversations);
      } catch (e: any) {
        console.error("Failed to fetch communication data:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    // Trigger fetch when userData (and thus departmentId) becomes available or changes
    fetchCommunicationData();
  }, [userData]); // Dependency on userData

  // Function to set selectedConversation to null
  const handleBackToDefault = () => {
    setSelectedConversation(null);
  };

  // A new handler for the unread filter switch
  const handleToggleUnreadFilter = (checked: boolean) => {
    setUnreadFilter(checked);
    setSelectedConversation(null);
  };

  if (loading) {
    return <div className="flex flex-1 items-center justify-center text-lg">Loading conversations... ⏳</div>;
  }

  if (error) {
    return <div className="flex flex-1 items-center justify-center text-lg text-red-500">Error: {error} 🙁</div>;
  }

  if (!userData || !userData.departmentId) {
    return <div className="flex flex-1 items-center justify-center text-lg">Please log in to view department-specific conversations.</div>;
  }


  return (
    <div className="flex flex-1 rounded-lg border bg-card text-card-foreground shadow-sm">
      <ConversationList
        conversations={conversations}
        selectedConversation={selectedConversation}
        onSelectConversation={setSelectedConversation}
        unreadFilter={unreadFilter}
        onToggleUnreadFilter={handleToggleUnreadFilter}
      />
      <MessageDetail
        conversation={selectedConversation}
        onBack={handleBackToDefault}
      />
    </div>
  );
}