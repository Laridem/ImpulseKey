import './index.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Hero Section */}
      <div className="max-w-2xl mx-auto text-center space-y-6">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
          IMPULSE KEYS
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-3xl text-gray-700 font-medium">
          体验脉冲人格测试
        </h2>

        {/* Tagline */}
        <p className="text-lg text-gray-600 mt-4">
          Discover your UX superpower in 16 questions
        </p>

        {/* Keycap Visual Placeholder */}
        <div className="my-12 flex justify-center gap-4 flex-wrap">
          {['VOC', 'FIORI', 'PIXEL', 'JOULE'].map((key) => (
            <div
              key={key}
              className="w-20 h-20 rounded-lg shadow-lg flex items-center justify-center font-bold text-white text-sm"
              style={{
                background: key === 'VOC' ? '#FF6B4A' :
                           key === 'FIORI' ? '#4A90FF' :
                           key === 'PIXEL' ? '#FF4A8C' : '#FFD74A'
              }}
            >
              {key}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="btn-primary text-lg px-8 py-4 mt-8">
          Start Test / 开始测试
        </button>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-12">
          16 result types · 2 min · Made for SAP Impulse26
        </p>
      </div>
    </div>
  )
}

export default App
