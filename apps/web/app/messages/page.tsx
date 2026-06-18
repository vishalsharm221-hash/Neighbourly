'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Send, Menu } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  sender?: { name: string; avatar_url?: string };
}

interface Conversation {
  id: string;
  participant_1_id: string;
  participant_2_id: string;
  last_message_at: string;
  participant_1?: { name: string; avatar_url?: string };
  participant_2?: { name: string; avatar_url?: string };
}

export default function MessagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get('id');

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      fetchConversations();
    }
  }, [currentUserId]);

  useEffect(() => {
    if (conversationId) {
      fetchMessages(conversationId);
      const convo = conversations.find((c) => c.id === conversationId);
      if (convo) setCurrentConversation(convo);
    }
  }, [conversationId, conversations]);

  async function fetchCurrentUser() {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setCurrentUserId(data.data.id);
      }
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  }

  async function fetchConversations() {
    try {
      setLoading(true);
      const response = await fetch('/api/conversations');
      const data = await response.json();
      setConversations(data.data || []);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMessages(convoId: string) {
    try {
      const response = await fetch(`/api/messages?conversationId=${convoId}`);
      const data = await response.json();
      setMessages(data.data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!messageText.trim() || !conversationId) return;

    setSending(true);
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          content: messageText,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages([...messages, data.data]);
        setMessageText('');
        // Scroll to bottom
        setTimeout(() => {
          const messagesContainer = document.getElementById('messages-container');
          if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
        }, 0);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  }

  function getOtherParticipant(conversation: Conversation) {
    return conversation.participant_1_id === currentUserId
      ? conversation.participant_2
      : conversation.participant_1;
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? 'w-80' : 'w-0'
        } bg-gray-50 border-r border-gray-200 overflow-hidden transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <Link href="/dashboard" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            Messages
          </Link>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : conversations.length > 0 ? (
            conversations.map((convo) => {
              const otherParticipant = getOtherParticipant(convo);
              const isActive = convo.id === conversationId;

              return (
                <button
                  key={convo.id}
                  onClick={() => {
                    router.push(`/messages?id=${convo.id}`);
                    setShowSidebar(false);
                  }}
                  className={`w-full text-left px-4 py-3 border-b border-gray-200 hover:bg-gray-100 transition ${
                    isActive ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {otherParticipant?.name || 'Unknown User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {new Date(convo.last_message_at || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>No conversations yet</p>
              <p className="text-sm mt-2">Send a message to start chatting</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <Menu className="w-5 h-5" />
            </button>
            {currentConversation && getOtherParticipant(currentConversation) && (
              <>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600"></div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {getOtherParticipant(currentConversation)?.name}
                  </p>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </>
            )}
          </div>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>

        {/* Messages */}
        {currentConversation ? (
          <>
            <div
              id="messages-container"
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Start a conversation</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender_id === currentUserId
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.created_at).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-gray-200 p-4 bg-white flex gap-2"
            >
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={sending}
              />
              <button
                type="submit"
                disabled={sending || !messageText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
