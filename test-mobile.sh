#!/bin/bash
# Quick test script for mobile optimization

echo "🚀 Starting development server for mobile testing..."
echo ""
echo "📱 Test URLs:"
echo "  - Local: http://localhost:5173"
echo "  - Network: http://$(ipconfig getifaddr en0 2>/dev/null || hostname):5173"
echo ""
echo "🧪 Test checklist:"
echo "  1. Open on iPhone/Android device"
echo "  2. Complete a test and go to result page"
echo "  3. Click 'Save as Image' button"
echo "  4. iOS/WeChat: Should show preview modal"
echo "  5. Android: Should try direct download"
echo ""
echo "📊 Check console for:"
echo "  - Device detection info"
echo "  - File size (should be < 1.5MB)"
echo "  - Conversion time (should be < 2s)"
echo ""
cd app && npm run dev
