"use client";

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { clients } from '../mockdata/clients'
import ChatSidebar from '../components/ChatSidebar'
import ChatHeader from '../components/ChatHeader'

export default function ChatSimulator() {
  const { clientId } = useParams()
  const [selectedClient, setSelectedClient] = useState(
    clientId ? clients.find(c => c.id === clientId) : clients[0]
  )
  const [messageInput, setMessageInput] = useState('')

  // Simulated messages
  const messages = [
    {
      id: 1,
      sender: 'client',
      name: 'Elena Villanueva',
      content: 'Hi! I have a question about my latest invoice. Could you help me check the details?',
      timestamp: '10:30 AM'
    }
  ]

  const quickQuestions = [
    { id: 1, text: 'Latest invoice?', icon: '📄' },
    { id: 2, text: 'Seat availability?', icon: '🪑' },
    { id: 3, text: 'Open tickets?', icon: '🎫' }
  ]

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput)
      setMessageInput('')
    }
  }

  return (
    <div className="flex h-screen">
      <ChatSidebar selectedClient={selectedClient} onClientSelect={setSelectedClient} />

      <div className="flex-1 flex flex-col bg-black">
        <ChatHeader selectedClient={selectedClient} />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Quick Demo Questions */}
          <div className="px-6 py-4 border-b border-[#2D2D2D]">
            <h3 className="text-sm font-medium text-[#A0A0A0] mb-3">Quick demo questions</h3>
            <div className="flex gap-3">
              {quickQuestions.map((question) => (
                <button
                  key={question.id}
                  className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#252525] border border-[#2D2D2D] rounded-lg text-white text-sm transition-all flex items-center gap-2"
                >
                  <span>{question.icon}</span>
                  <span>{question.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                {/* Incoming message */}
                <div className="flex items-start gap-3 max-w-[70%]">
                  <div className={`w-8 h-8 rounded-full ${selectedClient?.avatarColor || 'bg-blue-500'} flex items-center justify-center text-white text-sm font-medium flex-shrink-0`}>
                    {selectedClient?.initials || 'CL'}
                  </div>
                  <div className="bg-[#1A1A1A] rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm font-medium">{message.name}</span>
                      <span className="text-[#808080] text-xs">{message.timestamp}</span>
                    </div>
                    <p className="text-white text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Area */}
          <div className="px-6 py-4 border-t border-[#2D2D2D]">
            <div className="flex items-center gap-3 bg-[#1A1A1A] rounded-full px-4 py-3">
              <button className="text-[#808080] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message to client"
                className="flex-1 bg-transparent text-white text-sm placeholder-[#808080] focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="text-[#8B5CF6] hover:text-[#A78BFA] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
