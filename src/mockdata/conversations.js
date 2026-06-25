export const conversations = {
  'CLT-003': [
    {
      id: 1,
      type: 'agent',
      message: 'Hi Patricia! I can answer questions about your invoices, seat allocation, and service requests. What do you need?',
      timestamp: '2026-06-25T10:30:00'
    },
    {
      id: 2,
      type: 'client',
      message: 'What is the status of my latest invoice?',
      timestamp: '2026-06-25T10:31:00'
    },
    {
      id: 3,
      type: 'agent',
      message: 'Here\'s the latest invoice for Horizon Retail:',
      timestamp: '2026-06-25T10:31:30',
      invoiceCard: {
        invoiceNumber: 'INV-2026-024',
        amount: 175600,
        dueDate: '2026-07-15',
        status: 'Paid'
      }
    }
  ],
  'CLT-001': [
    {
      id: 1,
      type: 'agent',
      message: 'Hi Maria! How can I help you today?',
      timestamp: '2026-06-25T09:15:00'
    }
  ],
  'CLT-005': [
    {
      id: 1,
      type: 'agent',
      message: 'Hello Elena! What can I assist you with?',
      timestamp: '2026-06-25T11:00:00'
    }
  ]
}

export const initialMessages = [
  {
    id: 'welcome',
    text: 'Hi! I can answer questions about your invoices, seat allocation, and service requests. What do you need?'
  }
]
