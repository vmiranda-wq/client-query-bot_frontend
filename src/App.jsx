import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import ChatSimulator from './pages/ChatSimulator'
import AdminDashboard from './pages/AdminDashboard'

function Navigation() {
  const location = useLocation()

  const tabs = [
    { path: '/', label: 'Chat simulator', icon: '💬' },
    { path: '/admin', label: 'Admin dashboard', icon: '⊞' },
  ]

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#1A1A1A] border-b border-[#2D2D2D]">
      <div className="flex gap-8">
        {tabs.map((tab) => {
          const isActive = tab.path === '/' && (location.pathname === '/' || location.pathname.startsWith('/CLT'))
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${
                isActive
                  ? 'border-[#8B5CF6] text-[#8B5CF6]'
                  : 'border-transparent text-[#808080] hover:text-[#A0A0A0]'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-sm font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>

      <button className="text-[#808080] hover:text-[#A0A0A0] transition-colors">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-black flex flex-col">
        <Navigation />
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<ChatSimulator />} />
            <Route path="/:clientId" element={<ChatSimulator />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
