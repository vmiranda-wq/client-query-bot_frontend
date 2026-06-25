"use client";

import { Link, useLocation } from 'react-router-dom'
import { clients } from '../mockdata/clients'

export default function ChatSidebar({ selectedClient, onClientSelect }) {
  const location = useLocation()

  return (
    <div className="w-[280px] bg-[#1A1A1A] flex flex-col h-screen border-r border-[#2D2D2D]">
      <div className="px-5 py-4 text-sm font-bold text-[#A0A0A0] border-b border-[#2D2D2D]">
        DEMO CLIENTS
      </div>

      <div className="flex-1 overflow-y-auto">
        {clients.map((client) => {
          const isActive = location.pathname === `/${client.id}`

          return (
            <Link
              key={client.id}
              to={`/${client.id}`}
              onClick={() => onClientSelect?.(client)}
              className={`block px-5 py-4 border-l-2 transition-all hover:bg-[#252525] w-full ${
                isActive ? 'border-[#8B5CF6] bg-[#252525]' : 'border-transparent'
              }`}
            >
              <div className="text-base text-white font-medium">{client.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#2D2D2D] text-[#A0A0A0]">
                  {client.id}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${
                  client.preferredChannel === 'WhatsApp' ? 'bg-[#25D366]' : 'bg-[#3478F6]'
                }`}>
                  {client.preferredChannel}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
