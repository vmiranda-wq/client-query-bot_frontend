"use client";

export default function ChatHeader({ selectedClient }) {
  if (!selectedClient) return null

  const statusColor = selectedClient.preferredChannel === 'WhatsApp' ? 'bg-[#25D366]' : 'bg-[#3478F6]'

  return (
    <div className="bg-[#1A1A1A] border-b border-[#2D2D2D] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with initials */}
          <div className={`w-10 h-10 rounded-full ${selectedClient.avatarColor} flex items-center justify-center text-white font-semibold`}>
            {selectedClient.initials}
          </div>

          {/* Client info */}
          <div>
            <h2 className="text-white font-medium text-base">{selectedClient.name}</h2>
            <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
              <span>{selectedClient.id}</span>
              <span>·</span>
              <span>{selectedClient.contact}</span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium text-white ${statusColor}`}>
                {selectedClient.preferredChannel}
              </span>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-4 text-[#808080]">
          <button className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
