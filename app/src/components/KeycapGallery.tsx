import { getAllKeycaps, getKeycapAsset, getKeycapColor } from '../utils/assets'

/**
 * Demo component showing all 16 keycap illustrations
 */
export function KeycapGallery() {
  const allKeys = getAllKeycaps()

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        All 16 IMPULSE KEYS
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {allKeys.map((key) => (
          <div
            key={key}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
          >
            {/* Keycap Illustration */}
            <div className="mb-4">
              <img
                src={getKeycapAsset(key)}
                alt={`${key} illustration`}
                className="w-32 h-32 mx-auto"
              />
            </div>

            {/* Key Badge */}
            <div
              className="inline-block px-4 py-2 rounded-lg font-bold text-white text-sm mb-2"
              style={{ backgroundColor: getKeycapColor(key) }}
            >
              {key}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
