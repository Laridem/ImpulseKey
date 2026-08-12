/**
 * Image Export Utilities - Mobile-optimized image generation
 *
 * Strategy:
 * - PNG → JPEG (0.9 quality) for 60-70% file size reduction
 * - Mobile: 2x resolution, Desktop: 3x resolution
 * - iOS/WeChat: Preview modal for long-press save
 * - Android/Desktop: Direct download
 */

// Detect mobile device and browser type
export const detectDevice = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android/i.test(ua);
  const isWeChat = /micromessenger/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);

  return {
    isMobile,
    isWeChat,
    isIOS,
    isAndroid,
    // iOS and WeChat need preview modal
    needsPreview: isIOS || isWeChat
  };
};

// Convert data URL to Blob with quality control
export const dataUrlToBlob = async (
  dataUrl: string,
  format: 'image/jpeg' | 'image/png' = 'image/jpeg'
): Promise<Blob> => {
  // If already a blob URL, fetch it
  if (dataUrl.startsWith('blob:')) {
    const response = await fetch(dataUrl);
    return response.blob();
  }

  // Convert base64 to blob
  const base64 = dataUrl.split(',')[1];
  const byteString = atob(base64);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: format });
};

// Download image directly (Desktop & Android Chrome)
export const downloadImage = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up blob URL if it was created
  if (dataUrl.startsWith('blob:')) {
    setTimeout(() => URL.revokeObjectURL(dataUrl), 100);
  }
};

// Show preview modal for long-press save (iOS & WeChat)
export const showImagePreview = (
  dataUrl: string,
  onClose: () => void,
  language: 'en' | 'zh' = 'en'
) => {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.id = 'image-preview-modal';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease-in-out;
  `;

  // Add fade-in animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Create image container
  const imgContainer = document.createElement('div');
  imgContainer.style.cssText = `
    max-width: 90%;
    max-height: 75vh;
    margin-bottom: 24px;
    animation: slideUp 0.3s ease-out;
  `;

  // Create image element
  const img = document.createElement('img');
  img.src = dataUrl;
  img.alt = 'Result Card';
  img.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  `;

  // Create instruction text
  const instruction = document.createElement('div');
  instruction.style.cssText = `
    color: white;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    margin-bottom: 16px;
    animation: slideUp 0.4s ease-out;
  `;
  instruction.innerHTML = `
    <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">
      ${language === 'zh' ? '长按图片保存' : 'Long press to save'}
    </div>
    <div style="font-size: 14px; opacity: 0.8;">
      ${language === 'zh' ? '长按图片,选择"保存图片"' : 'Long press the image and select "Save Image"'}
    </div>
  `;

  // Create close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = language === 'zh' ? '关闭' : 'Close';
  closeBtn.style.cssText = `
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 12px 32px;
    border-radius: 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.2s;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    animation: slideUp 0.5s ease-out;
  `;

  closeBtn.onmouseover = () => {
    closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
    closeBtn.style.transform = 'scale(1.05)';
  };
  closeBtn.onmouseout = () => {
    closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    closeBtn.style.transform = 'scale(1)';
  };

  closeBtn.onclick = () => {
    overlay.style.animation = 'fadeOut 0.2s ease-out';
    style.textContent += `
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    setTimeout(() => {
      document.body.removeChild(overlay);
      document.head.removeChild(style);
      onClose();
    }, 200);
  };

  // Assemble modal
  imgContainer.appendChild(img);
  overlay.appendChild(instruction);
  overlay.appendChild(imgContainer);
  overlay.appendChild(closeBtn);

  // Close on overlay click (but not image click)
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      closeBtn.click();
    }
  };

  document.body.appendChild(overlay);
};

// Get optimal export settings based on device
export const getExportSettings = () => {
  const device = detectDevice();

  return {
    // Use JPEG for better compression
    format: 'image/jpeg' as const,
    quality: 0.9, // 0.9 quality maintains good visual quality with 60-70% size reduction

    // Mobile: 2x resolution, Desktop: 3x resolution
    pixelRatio: device.isMobile ? 2 : 3,

    // Fixed dimensions
    width: 1080,
    height: 1920,

    // Device info
    device
  };
};

// Format file size for display
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

// Main export handler with strategy selection
export const handleImageExport = async (
  dataUrl: string,
  filename: string,
  language: 'en' | 'zh' = 'en',
  onClose?: () => void
) => {
  const settings = getExportSettings();

  console.log('Export settings:', settings);
  console.log('Original data URL size:', formatFileSize(dataUrl.length));

  // iOS & WeChat: Show preview modal for long-press save
  if (settings.device.needsPreview) {
    showImagePreview(dataUrl, onClose || (() => {}), language);
  }
  // Android & Desktop: Direct download
  else {
    // Try direct download first
    try {
      downloadImage(dataUrl, filename);
      console.log('✅ Direct download initiated');
    } catch (error) {
      console.warn('Direct download failed, falling back to preview:', error);
      // Fallback to preview if direct download fails
      showImagePreview(dataUrl, onClose || (() => {}), language);
    }
  }
};
