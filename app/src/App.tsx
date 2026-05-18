import './index.css'
import { KeycapGallery } from './components/KeycapGallery'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
      {/* Hero Section */}
      <div className="max-w-2xl mx-auto text-center space-y-6 mb-12 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
          IMPULSE KEYS
        </h1>

        <h2 className="text-2xl md:text-3xl text-gray-700 font-medium">
          体验脉冲人格测试
        </h2>

        <p className="text-lg text-gray-600 mt-4">
          Discover your UX superpower in 16 questions
        </p>

        <button className="px-8 py-4 mt-8 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
          Start Test / 开始测试
        </button>

        <p className="text-sm text-gray-500 mt-8">
          16 result types · 2 min · Made for SAP Impulse26
        </p>
      </div>

      {/* Gallery of all keycaps */}
      <KeycapGallery />
    </div>
  )
}

export default App
