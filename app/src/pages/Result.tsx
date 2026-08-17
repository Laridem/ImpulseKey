import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toJpeg, toSvg } from 'html-to-image';
import confetti from 'canvas-confetti';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { useLanguage } from '../i18n/LanguageContext';
import { getKeycapAsset } from '../utils/assets';
import { getColorGroupForResult } from '../data/colorGroups';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ShareCard } from '../components/ShareCard';
import { getAccessibleTextColor } from '../utils/contrast';
import { getAllResultKeys } from '../data/results';
import { RESULT_HASHTAGS } from '../data/hashtags';
import { getExportSettings, handleImageExport, formatFileSize } from '../utils/imageExport';

export const Result = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const { result, dimensionScores, goToResult, resetTest } = useTest();
  const t = useTranslation();
  const { language } = useLanguage();
  const resultRef = useRef<HTMLDivElement>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hoveredLockedKey, setHoveredLockedKey] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const loadingIntervalRef = useRef<number | null>(null);

  // Load result if accessed directly via URL or when key changes
  useEffect(() => {
    if (key) {
      goToResult(key);
    }
  }, [key, goToResult]);

  // Rotate loading messages
  const loadingMessages = [
    { en: 'Negotiating with stubborn pixels...', zh: '正在说服像素合作...' },
    { en: 'Teaching AI what "fast" means...', zh: '正在教 AI 什么叫快...' },
    { en: 'Loading... your coffee has time to cool...', zh: '生成中...你的咖啡都凉了...' },
    { en: 'Exporting faster than your emails...', zh: '比你的邮件回复快多了...' },
    { en: 'Converting chaos into beauty...', zh: '正在将混乱转化为艺术...' },
    { en: 'Processing... like your Monday brain...', zh: '加载中...和周一的脑子一样慢...' },
    { en: 'Still faster than meetings...', zh: '还是比开会快...' },
    { en: 'Your result is worth the wait (we hope)...', zh: '你的结果值得等待（大概）...' },
  ];

  useEffect(() => {
    if (isCapturing) {
      // Start rotating messages every 1.5 seconds
      loadingIntervalRef.current = window.setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 1500);
    } else {
      // Clear interval when not capturing
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
      // Reset to first message
      setLoadingMessageIndex(0);
    }

    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
      }
    };
  }, [isCapturing]);

  const handleRetake = () => {
    console.log('handleRetake called');
    console.log('Resetting test and going to landing...');
    resetTest();
    // Use setTimeout to ensure state is cleared before navigation
    setTimeout(() => {
      // Force full page reload to ensure clean state
      window.location.href = '/';
    }, 100);
  };

  const handleShare = async () => {
    console.log('handleShare called');
    console.log('shareCardRef.current:', shareCardRef.current);
    console.log('result:', result);

    setImageError(null); // Clear any previous errors

    if (!shareCardRef.current || !result) {
      console.error('Missing ref or result:', { ref: shareCardRef.current, result });
      setImageError(language === 'zh' ? '无法生成图片，请刷新页面后重试。' : 'Unable to capture image. Please refresh and try again.');
      return;
    }

    setIsCapturing(true);

    try {
      const startTime = performance.now();
      console.log('Starting image capture...');

      // Get optimal export settings based on device
      const settings = getExportSettings();
      console.log('📱 Device detection:', {
        isMobile: settings.device.isMobile,
        isWeChat: settings.device.isWeChat,
        isIOS: settings.device.isIOS,
        needsPreview: settings.device.needsPreview,
        pixelRatio: settings.pixelRatio,
        format: settings.format
      });

      // 🎯 MOBILE FIX: Use pre-rendered images on mobile devices
      // html-to-image fails on iOS/mobile, so we use pre-generated share cards
      if (settings.device.isMobile) {
        console.log('🔧 Mobile device detected - using pre-rendered share card');

        // Use language-specific pre-rendered image
        const preRenderedUrl = `/assets/share-cards/${language}/${result.key}.jpg`;
        console.log(`Fetching pre-rendered image: ${preRenderedUrl} (language: ${language})`);

        try {
          // Fetch the pre-rendered image
          const response = await fetch(preRenderedUrl);
          if (!response.ok) {
            throw new Error(`Pre-rendered image not found: ${preRenderedUrl}`);
          }

          const blob = await response.blob();
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });

          console.log('✅ Pre-rendered image loaded');

          // Use intelligent export strategy based on device
          const filename = `IMPULSE-${result.key}.jpg`;
          await handleImageExport(dataUrl, filename, language, () => {
            setIsCapturing(false);
          });

          const totalTime = performance.now() - startTime;
          console.log(`✅ Export completed! Total time: ${Math.round(totalTime)}ms`);

          if (!settings.device.needsPreview) {
            setIsCapturing(false);
          }

          return; // Exit early - mobile flow complete
        } catch (preRenderError) {
          console.error('❌ Failed to load pre-rendered image:', preRenderError);
          console.warn('⚠️ Falling back to html-to-image (may fail on mobile)');
          // Fall through to html-to-image flow below
        }
      }

      // DESKTOP FLOW: Continue with html-to-image (works fine on desktop)

      // Step 1: Pre-load images to browser cache AND decode them
      const imagesToPreload = [
        getKeycapAsset(result.key),
        '/assets/Anvils-1.png',
        '/assets/qr-code.png'
      ];

      console.log('Pre-loading and decoding images...');
      const preloadStart = performance.now();

      try {
        await Promise.all(
          imagesToPreload.map(async (src) => {
            const img = new Image();
            img.src = src;

            // Wait for image to load
            await new Promise((resolve, reject) => {
              if (img.complete && img.naturalHeight !== 0) {
                resolve(img);
              } else {
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error(`Failed to load: ${src}`));
              }
            });

            // Wait for image to decode (iOS Chrome optimization)
            await img.decode();
            console.log('Loaded + decoded:', src);
            return img;
          })
        );
      } catch (preloadError) {
        console.error('Failed to preload images:', preloadError);
        const errorMsg = language === 'zh'
          ? '图片加载失败，请检查网络连接后重试。'
          : 'Failed to load images. Please check your network and try again.';
        setImageError(errorMsg);
        throw new Error(`Image preload failed: ${preloadError instanceof Error ? preloadError.message : 'Unknown error'}`);
      }

      const preloadEnd = performance.now();
      console.log(`✅ All images pre-loaded and decoded in ${Math.round(preloadEnd - preloadStart)}ms`);

      // iOS FIX: Manually convert images to data URLs BEFORE html-to-image
      // html-to-image's internal image embedding is failing on iOS
      // Solution: Convert images to data URLs ourselves and inject them into DOM
      console.log('🔧 iOS Fix: Manually converting images to data URLs...');
      const imageConversionStart = performance.now();

      const convertImageToDataUrl = async (src: string): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                reject(new Error('Failed to get canvas context'));
                return;
              }
              ctx.drawImage(img, 0, 0);
              const dataUrl = canvas.toDataURL('image/png');
              resolve(dataUrl);
            } catch (error) {
              reject(error);
            }
          };
          img.onerror = () => reject(new Error(`Failed to load: ${src}`));
          img.src = src;
        });
      };

      try {
        const imageDataUrls = await Promise.all(
          imagesToPreload.map(src => convertImageToDataUrl(src))
        );
        console.log(`✅ Converted ${imageDataUrls.length} images to data URLs`);

        // Now replace <img src="/assets/..."> with <img src="data:image/png;base64,...">
        // in the ShareCard DOM before html-to-image processes it
        if (shareCardRef.current) {
          const cardImages = shareCardRef.current.querySelectorAll('img');
          cardImages.forEach((img, index) => {
            const originalSrc = img.src;
            const matchingDataUrl = imageDataUrls.find((_, i) => {
              const preloadSrc = imagesToPreload[i];
              return originalSrc.includes(preloadSrc.replace(/^\//, ''));
            });

            if (matchingDataUrl) {
              console.log(`Replacing image ${index + 1} src with data URL`);
              img.src = matchingDataUrl;
            }
          });
        }

        const imageConversionEnd = performance.now();
        console.log(`✅ Image conversion completed in ${Math.round(imageConversionEnd - imageConversionStart)}ms`);
      } catch (conversionError) {
        console.error('❌ Image conversion failed:', conversionError);
        // Continue anyway - html-to-image will try its own embedding
      }

      // Step 2: Force a reflow to ensure DOM is fully updated
      if (shareCardRef.current) {
        shareCardRef.current.getBoundingClientRect();
      }

      // Step 3: Wait for images in ShareCard DOM to be ready
      console.log('Waiting for ShareCard images to render...');
      const cardImageStart = performance.now();

      await new Promise<void>((resolve) => {
        const checkImages = async () => {
          const cardImages = shareCardRef.current?.querySelectorAll('img');
          if (!cardImages || cardImages.length === 0) {
            console.warn('No images found in ShareCard, retrying...');
            setTimeout(checkImages, 100);
            return;
          }

          console.log(`Found ${cardImages.length} images in ShareCard`);

          try {
            // Wait for all images in ShareCard to be complete and decoded
            await Promise.all(
              Array.from(cardImages).map(async (img, index) => {
                // Check if image is already loaded
                if (img.complete && img.naturalHeight > 0) {
                  console.log(`Image ${index + 1} already loaded:`, img.src);
                  // Still decode it to ensure it's ready for rendering
                  await img.decode();
                  return;
                }

                // Wait for image to load
                console.log(`Waiting for image ${index + 1}:`, img.src);
                await new Promise((resolveImg, rejectImg) => {
                  img.onload = () => resolveImg(img);
                  img.onerror = () => rejectImg(new Error(`Failed to load image in card: ${img.src}`));

                  // Force reload if src is set but not loading
                  if (img.src && !img.complete) {
                    const currentSrc = img.src;
                    img.src = '';
                    img.src = currentSrc;
                  }
                });

                // Wait for decode
                await img.decode();
                console.log(`Image ${index + 1} loaded + decoded`);
              })
            );

            const cardImageEnd = performance.now();
            console.log(`✅ ShareCard images ready in ${Math.round(cardImageEnd - cardImageStart)}ms`);
            resolve();
          } catch (error) {
            console.error('Error waiting for ShareCard images:', error);
            // Continue anyway after a small delay
            setTimeout(resolve, 500);
          }
        };

        checkImages();
      });

      // Step 4: Additional frame wait for iOS Chrome rendering
      await new Promise(resolve => requestAnimationFrame(resolve));
      await new Promise(resolve => requestAnimationFrame(resolve));

      // iOS FIX: Force browser to fully settle image decoding before html-to-image
      // html-to-image clones DOM and re-fetches images internally
      // On iOS Chrome first load, this races with our preload and fails
      // Solution: Add aggressive settle time AFTER decode
      console.log('⏳ iOS Fix: Waiting 500ms for browser image decode settlement...');
      await new Promise(resolve => setTimeout(resolve, 500));

      // DIAGNOSTIC: Log all images in export DOM BEFORE html-to-image processing
      console.log('═══════════════════════════════════════════════════════');
      console.log('📸 EXPORT DOM IMAGE AUDIT - BEFORE html-to-image');
      console.log('═══════════════════════════════════════════════════════');

      if (shareCardRef.current) {
        const allImages = shareCardRef.current.querySelectorAll('img');
        console.log(`Total images found in export DOM: ${allImages.length}`);

        allImages.forEach((img, index) => {
          const isCharacter = img.src.includes('result-cards/');
          const label = isCharacter ? '👤 CHARACTER IMAGE' : `Image ${index + 1}`;

          console.log(`\n${label}:`);
          console.log({
            src: img.src,
            currentSrc: img.currentSrc,
            complete: img.complete,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            loading: img.loading,
            alt: img.alt,
            className: img.className,
          });

          // Critical readiness check
          if (!img.complete) {
            console.warn(`⚠️ ${label} NOT COMPLETE`);
          }
          if (img.naturalWidth === 0 || img.naturalHeight === 0) {
            console.error(`❌ ${label} ZERO DIMENSIONS - NOT DECODED`);
          }
          if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
            console.log(`✅ ${label} READY (complete=${img.complete}, ${img.naturalWidth}×${img.naturalHeight})`);
          }
        });

        console.log('\n═══════════════════════════════════════════════════════');
      }

      console.log(`Converting to ${settings.format} with pixelRatio: ${settings.pixelRatio}, quality: ${settings.quality}`);

      try {
        const conversionStart = performance.now();

        // iOS FIX: Enable cacheBust to force html-to-image to re-fetch images
        // This ensures it gets the fully loaded images from browser cache
        // instead of racing with our preload logic
        console.log('🔧 iOS Fix: Using cacheBust=true to force fresh image embedding');

        // DIAGNOSTIC EXPERIMENT: Test toSvg vs toJpeg WITH FIX
        console.log('\n🔬 DIAGNOSTIC: Testing toSvg() with cacheBust=true...');
        const svgDataUrl = await toSvg(shareCardRef.current, {
          cacheBust: true, // ⚠️ FIX: Force html-to-image to re-fetch images
          pixelRatio: settings.pixelRatio,
          backgroundColor: '#ffffff',
          width: settings.width,
          height: settings.height,
          skipFonts: false,
          preferredFontFormat: 'woff2',
        });

        console.log('✅ toSvg() completed');
        console.log(`SVG data URL length: ${formatFileSize(svgDataUrl.length)}`);
        console.log('⚠️ IMPORTANT: Manually inspect the preview - does the SVG show the character?');

        // Step 2: Also generate JPEG for comparison
        console.log('\n🔬 DIAGNOSTIC: Now testing toJpeg() with cacheBust=true...');
        const dataUrl = await toJpeg(shareCardRef.current, {
          cacheBust: true, // ⚠️ FIX: Force html-to-image to re-fetch images
          pixelRatio: settings.pixelRatio,
          quality: settings.quality, // JPEG quality (0.9 = 90%)
          backgroundColor: '#ffffff',
          width: settings.width,
          height: settings.height,
          skipFonts: false,
          preferredFontFormat: 'woff2', // Use modern font format for speed
        });

        const conversionEnd = performance.now();
        const estimatedSize = dataUrl.length * 0.75; // Rough estimate of decoded size
        console.log(`✅ JPEG conversion completed in ${Math.round(conversionEnd - conversionStart)}ms`);
        console.log(`📦 Data URL length: ${formatFileSize(dataUrl.length)} (estimated decoded: ${formatFileSize(estimatedSize)})`);

        // DIAGNOSTIC: Show BOTH SVG and JPEG in preview for comparison
        console.log('\n═══════════════════════════════════════════════════════');
        console.log('🔍 DIAGNOSTIC RESULTS:');
        console.log('1. Check the preview - do you see the character in the SVG version?');
        console.log('2. Check the preview - do you see the character in the JPEG version?');
        console.log('3. This will determine if the bug is in:');
        console.log('   - Case A: SVG generation (clone/embed/fetch stage)');
        console.log('   - Case B: SVG→Canvas→JPEG conversion (decode/canvas stage)');
        console.log('═══════════════════════════════════════════════════════');

        // Use intelligent export strategy based on device
        const filename = `IMPULSE-${result.key}.jpg`;

        // DIAGNOSTIC MODE: Show both SVG and JPEG in preview
        if (settings.device.needsPreview) {
          // Create custom diagnostic preview showing BOTH versions
          const overlay = document.createElement('div');
          overlay.id = 'diagnostic-preview-modal';
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
            justify-content: flex-start;
            padding: 20px;
            overflow-y: auto;
          `;

          const title = document.createElement('div');
          title.style.cssText = `
            color: white;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
          `;
          title.textContent = '🔬 DIAGNOSTIC MODE: Compare SVG vs JPEG';

          // SVG Preview
          const svgContainer = document.createElement('div');
          svgContainer.style.cssText = `
            margin-bottom: 20px;
            text-align: center;
          `;
          const svgLabel = document.createElement('div');
          svgLabel.style.cssText = 'color: #64EDD2; font-weight: bold; margin-bottom: 10px;';
          svgLabel.textContent = '1️⃣ SVG Version (does it have the character?)';
          const svgImg = document.createElement('img');
          svgImg.src = svgDataUrl;
          svgImg.style.cssText = `
            max-width: 90%;
            max-height: 40vh;
            border: 2px solid #64EDD2;
            border-radius: 8px;
          `;

          // JPEG Preview
          const jpegContainer = document.createElement('div');
          jpegContainer.style.cssText = `
            margin-bottom: 20px;
            text-align: center;
          `;
          const jpegLabel = document.createElement('div');
          jpegLabel.style.cssText = 'color: #FFC933; font-weight: bold; margin-bottom: 10px;';
          jpegLabel.textContent = '2️⃣ JPEG Version (does it have the character?)';
          const jpegImg = document.createElement('img');
          jpegImg.src = dataUrl;
          jpegImg.style.cssText = `
            max-width: 90%;
            max-height: 40vh;
            border: 2px solid #FFC933;
            border-radius: 8px;
          `;

          // Close button
          const closeBtn = document.createElement('button');
          closeBtn.textContent = 'Close';
          closeBtn.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid white;
            color: white;
            padding: 12px 32px;
            border-radius: 24px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
          `;
          closeBtn.onclick = () => {
            document.body.removeChild(overlay);
            setIsCapturing(false);
          };

          svgContainer.appendChild(svgLabel);
          svgContainer.appendChild(svgImg);
          jpegContainer.appendChild(jpegLabel);
          jpegContainer.appendChild(jpegImg);

          overlay.appendChild(title);
          overlay.appendChild(svgContainer);
          overlay.appendChild(jpegContainer);
          overlay.appendChild(closeBtn);

          document.body.appendChild(overlay);
        } else {
          await handleImageExport(dataUrl, filename, language, () => {
            setIsCapturing(false);
          });
        }

        const totalTime = performance.now() - startTime;
        console.log(`✅ Export completed! Total time: ${Math.round(totalTime)}ms`);

        // Don't reset isCapturing here if preview modal is shown
        // The modal's onClose will handle it
        if (!settings.device.needsPreview) {
          setIsCapturing(false);
        }
      } catch (conversionError) {
        console.error('JPEG conversion failed:', conversionError);
        throw new Error(`Image conversion failed: ${conversionError instanceof Error ? conversionError.message : 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to capture image:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const userMessage = language === 'zh'
        ? `图片生成失败：${errorMessage}。请重试。`
        : `Failed to save image: ${errorMessage}. Please try again.`;
      setImageError(userMessage);
      setIsCapturing(false);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="font-72-brand text-body-lg text-[#534150]">Loading result...</p>
        </div>
      </div>
    );
  }

  const colorGroup = getColorGroupForResult(result.key);

  // Generate appropriate demo scores based on result key's dimensions
  // This is used when viewing results directly (admin preview, direct URL) without test data
  const getDemoScores = (resultKey: string) => {
    // Map each result to its dominant dimensions based on the official mapping
    const dimensionMap: Record<string, [string, string, string, string]> = {
      'VOC': ['Signal', 'Human', 'Explore', 'Spark'],
      'QAQ': ['Signal', 'Human', 'Explore', 'Stabilize'],
      'FIRE': ['Signal', 'Human', 'Align', 'Spark'],
      'A11Y': ['Signal', 'Human', 'Align', 'Stabilize'],
      'JOULE': ['Signal', 'Machine', 'Explore', 'Spark'],
      'LOGS': ['Signal', 'Machine', 'Explore', 'Stabilize'],
      'AGENT': ['Signal', 'Machine', 'Align', 'Spark'],
      'SAFE': ['Signal', 'Machine', 'Align', 'Stabilize'],
      'BTP': ['Solution', 'Human', 'Explore', 'Spark'],
      'PIXEL': ['Solution', 'Human', 'Explore', 'Stabilize'],
      'TRIO': ['Solution', 'Human', 'Align', 'Spark'],
      'FIORI': ['Solution', 'Human', 'Align', 'Stabilize'],
      'API': ['Solution', 'Machine', 'Explore', 'Spark'],
      'OData': ['Solution', 'Machine', 'Explore', 'Stabilize'],
      'CTRL': ['Solution', 'Machine', 'Align', 'Spark'],
      'CORE': ['Solution', 'Machine', 'Align', 'Stabilize']
    };

    const dimensions = dimensionMap[resultKey];
    if (!dimensions) {
      // Fallback if result key not found
      return {
        Signal: 50, Solution: 50,
        Human: 50, Machine: 50,
        Explore: 50, Align: 50,
        Spark: 50, Stabilize: 50
      };
    }

    // Create scores where dominant poles are 70-80%, recessive poles are 20-30%
    const scores = {
      Signal: 20,
      Solution: 20,
      Human: 20,
      Machine: 20,
      Explore: 20,
      Align: 20,
      Spark: 20,
      Stabilize: 20
    };

    // Set dominant dimensions
    const [dimA, dimB, dimC, dimD] = dimensions;

    // Dimension A (Signal vs Solution)
    if (dimA === 'Signal') {
      scores.Signal = 75;
      scores.Solution = 25;
    } else {
      scores.Signal = 25;
      scores.Solution = 75;
    }

    // Dimension B (Human vs Machine)
    if (dimB === 'Human') {
      scores.Human = 70;
      scores.Machine = 30;
    } else {
      scores.Human = 30;
      scores.Machine = 70;
    }

    // Dimension C (Explore vs Align)
    if (dimC === 'Explore') {
      scores.Explore = 80;
      scores.Align = 20;
    } else {
      scores.Explore = 20;
      scores.Align = 80;
    }

    // Dimension D (Spark vs Stabilize)
    if (dimD === 'Spark') {
      scores.Spark = 65;
      scores.Stabilize = 35;
    } else {
      scores.Spark = 35;
      scores.Stabilize = 65;
    }

    return scores;
  };

  // Use actual dimension scores or generate appropriate demo scores
  const displayScores = dimensionScores || getDemoScores(result.key);

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Helper function to darken light colors for better readability
  const getDarkerImpulseColor = (hex: string): string => {
    // Yellow #FFC933 and Cyan #64EDD2 need darkening for readability on white
    const colorMap: { [key: string]: string } = {
      '#FFC933': '#CC9900', // Darker yellow with better contrast
      '#64EDD2': '#00A896', // Darker cyan/teal with better contrast
      '#A100C2': '#A100C2', // Purple is fine
      '#7858FF': '#7858FF', // Purple/blue is fine
    };
    return colorMap[hex.toUpperCase()] || hex;
  };

  // Helper function to get text color with proper WCAG contrast on colored background
  const getPunchlineTextColor = (bgColor: string): string => {
    // For solid color background, use WCAG-compliant text color
    return getAccessibleTextColor(bgColor);
  };

  // Dynamic colors based on impulse color
  const impulseColor = colorGroup.color;
  const impulseColorText = getDarkerImpulseColor(impulseColor); // Darker version for text on white
  const cardBg = hexToRgba(impulseColor, 0.08);
  const cardBorder = hexToRgba(impulseColor, 0.20);
  const punchlineTextColor = getPunchlineTextColor(impulseColor); // WCAG-compliant text for punchline

  // Get contrasting Impulse colors for neon glitch effect
  const getGlitchColors = (currentColor: string) => {
    const impulseColors = ['#A100C2', '#FFC933', '#64EDD2', '#7858FF'];
    // Filter out the current color and return the other three
    return impulseColors.filter(c => c !== currentColor);
  };

  const glitchColors = getGlitchColors(colorGroup.color);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <Header showHomeButton={true} showRetakeButton={true} onRetake={handleRetake} />
      </div>

      <main ref={resultRef} className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 py-6 sm:py-8 md:py-12 pb-24 lg:pb-12 w-full">
        {/* Responsive Layout: Single column on mobile, 12-column grid on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12">
          {/* Left Sidebar: Full width on mobile, 4 columns on desktop */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Character Card - Neo-Playful 3D Style */}
            <div
              className="relative bg-gradient-to-br from-white via-[#fffbfe] to-[#fef5fb] border-2 rounded-xl p-4 lg:p-6 lg:p-\[33px\] flex flex-col gap-4 lg:gap-6 transition-all duration-300 hover:translate-y-[-4px]"
              style={{
                borderColor: colorGroup.color,
                boxShadow: `
                  0 1px 0 0 rgba(255,255,255,0.5) inset,
                  0 -1px 0 0 rgba(0,0,0,0.05) inset,
                  0 4px 8px -2px rgba(168,0,170,0.2),
                  0 8px 16px -4px rgba(168,0,170,0.15),
                  0 16px 32px -8px rgba(168,0,170,0.1),
                  0 0 40px -10px ${hexToRgba(colorGroup.color, 0.3)}
                `,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 1px 0 0 rgba(255,255,255,0.6) inset,
                  0 -1px 0 0 rgba(0,0,0,0.05) inset,
                  0 8px 16px -2px rgba(168,0,170,0.25),
                  0 16px 32px -4px rgba(168,0,170,0.2),
                  0 24px 48px -8px rgba(168,0,170,0.15),
                  0 0 60px -5px ${hexToRgba(colorGroup.color, 0.5)}
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 1px 0 0 rgba(255,255,255,0.5) inset,
                  0 -1px 0 0 rgba(0,0,0,0.05) inset,
                  0 4px 8px -2px rgba(168,0,170,0.2),
                  0 8px 16px -4px rgba(168,0,170,0.15),
                  0 16px 32px -8px rgba(168,0,170,0.1),
                  0 0 40px -10px ${hexToRgba(colorGroup.color, 0.3)}
                `;
              }}
            >
              {/* Keycap with 3D volumetric lighting */}
              <div className="flex justify-center">
                <div
                  className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-2xl border-[3px] p-2 flex items-center justify-center transition-all duration-500 hover:scale-105 cursor-pointer group overflow-hidden"
                  style={{
                    background: colorGroup.color,
                    borderColor: '#f65af2',
                    boxShadow: `
                      0 1px 2px 0 rgba(255,255,255,0.8) inset,
                      0 6px 0px 0px rgba(216,191,209,0.8),
                      0 12px 20px -4px rgba(0,0,0,0.25),
                      -3px -3px 12px 0px ${glitchColors[0]}50,
                      3px 3px 12px 0px ${glitchColors[1]}50,
                      0px 0px 30px 0px ${glitchColors[2]}40,
                      0 0 80px -20px ${hexToRgba(colorGroup.color, 0.6)}
                    `
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) rotateX(5deg) rotateY(5deg)';
                    e.currentTarget.style.boxShadow = `
                      0 2px 4px 0 rgba(255,255,255,0.9) inset,
                      0 8px 0px 0px rgba(216,191,209,0.9),
                      0 16px 32px -4px rgba(0,0,0,0.35),
                      -5px -5px 20px 0px ${glitchColors[0]}70,
                      5px 5px 20px 0px ${glitchColors[1]}70,
                      0px 0px 50px 0px ${glitchColors[2]}60,
                      -8px 0px 25px 0px ${glitchColors[0]}50,
                      8px 0px 25px 0px ${glitchColors[1]}50,
                      0 0 120px -10px ${hexToRgba(colorGroup.color, 0.8)}
                    `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = `
                      0 1px 2px 0 rgba(255,255,255,0.8) inset,
                      0 6px 0px 0px rgba(216,191,209,0.8),
                      0 12px 20px -4px rgba(0,0,0,0.25),
                      -3px -3px 12px 0px ${glitchColors[0]}50,
                      3px 3px 12px 0px ${glitchColors[1]}50,
                      0px 0px 30px 0px ${glitchColors[2]}40,
                      0 0 80px -20px ${hexToRgba(colorGroup.color, 0.6)}
                    `;
                  }}
                >
                  {/* Volumetric light overlay - reduced opacity */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    style={{
                      background: `
                        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
                        radial-gradient(circle at 70% 70%, ${hexToRgba(colorGroup.color, 0.3)} 0%, transparent 60%)
                      `
                    }}
                  />
                  {/* Grain texture overlay - very subtle */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.06] mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      backgroundSize: '100px 100px'
                    }}
                  />
                  <img
                    key={result.key}
                    src={getKeycapAsset(result.key)}
                    alt={result.name.en}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Key Abbreviation Display */}
              <div className="flex justify-center -mt-2">
                <div
                  className="font-jetbrains-mono font-bold text-[32px] leading-[40px] tracking-widest uppercase"
                  style={{
                    color: impulseColorText,
                    textShadow: `
                      2px 2px 0px ${glitchColors[0]}40,
                      -2px -2px 0px ${glitchColors[1]}40,
                      0px 3px 6px ${glitchColors[2]}30
                    `
                  }}
                >
                  {result.key}
                </div>
              </div>

              {/* Titles */}
              <div className="flex flex-col items-center gap-3">
                <h2 className="font-space-grotesk font-normal text-[24px] lg:text-[24px] leading-[30px] tracking-[-0.6px] text-[#231821] text-center uppercase">
                  {result.name.en}
                </h2>
                <h3 className="font-72-brand font-medium text-[18px] lg:text-[18px] leading-[24px] text-[#a800aa] text-center">
                  {result.name.zh}
                </h3>
                {/* Dynamic Most Likely to Say or fallback to motto */}
                <p className="font-space-grotesk font-normal text-[18px] leading-[28px] text-[#534150] text-center pt-4">
                  {(language === 'zh' ? result.mostLikelyToSayCN : result.mostLikelyToSayEN) || `"${result.motto.en}"`}
                </p>
              </div>

              {/* Color Badge - Compact version without ellipse */}
              <div className="pt-2">
                <div
                  className="relative border-2 rounded-lg p-4 sm:p-6 overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, #ffffff 0%, #fef5fb 100%)',
                    borderColor: impulseColor,
                    boxShadow: `
                      0 1px 0 0 rgba(255,255,255,0.6) inset,
                      0 2px 8px -2px ${hexToRgba(impulseColor, 0.3)},
                      0 4px 16px -4px ${hexToRgba(impulseColor, 0.2)}
                    `
                  }}
                >
                  {/* Subtle highlight overlay */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)'
                    }}
                  />

                  {/* Compact single-column for mobile, side-by-side for desktop with 1:2 ratio */}
                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 lg:items-center relative z-10">
                    {/* Group 1: Color Info - 1 part */}
                    <div className="flex flex-col gap-2 items-center lg:flex-shrink-0">
                      {/* Color swatch - smaller */}
                      <div
                        className="relative w-12 h-12 lg:w-20 lg:h-20 rounded-lg flex-shrink-0"
                        style={{
                          background: `
                            radial-gradient(circle at 30% 30%, ${hexToRgba(colorGroup.color, 0.9)} 0%, ${colorGroup.color} 100%)
                          `,
                          boxShadow: `
                            0 1px 2px 0 rgba(255,255,255,0.5) inset,
                            0 2px 4px 0 rgba(0,0,0,0.15),
                            0 0 12px -2px ${hexToRgba(colorGroup.color, 0.6)}
                          `
                        }}
                      />
                      {/* Hex code */}
                      <p
                        className="font-jetbrains-mono font-medium text-[14px] lg:text-[15px] leading-[18px] lg:leading-[20px]"
                        style={{ color: impulseColorText }}
                      >
                        {colorGroup.color.toUpperCase()}
                      </p>
                      {/* Color name */}
                      <p
                        className="font-space-grotesk font-bold text-[15px] lg:text-[16px] leading-[18px] lg:leading-[20px] uppercase"
                        style={{ color: impulseColorText }}
                      >
                        {language === 'zh' ? colorGroup.nameCN : colorGroup.nameEN}
                      </p>
                    </div>

                    {/* Divider - only on desktop */}
                    <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-[#d8bfd1] to-transparent flex-shrink-0"></div>

                    {/* Group 2: Core Personality - 2 parts (more space) */}
                    <div className="flex flex-col gap-2 items-center lg:items-start lg:flex-1 lg:max-w-none">
                      <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider lg:text-left">
                        CORE PERSONALITY
                      </p>
                      <p
                        className="font-space-grotesk font-semibold text-[14px] lg:text-[16px] leading-[20px] lg:leading-[26px] text-center lg:text-left"
                        style={{ color: impulseColorText }}
                      >
                        {language === 'zh' ? colorGroup.descriptionCN : colorGroup.descriptionEN}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button - Save as Image only */}
              <div className="hidden lg:flex flex-col gap-4 pt-6">
                <button
                  onClick={handleShare}
                  disabled={isCapturing}
                  className="relative w-full text-white font-space-grotesk font-bold text-[16px] leading-[24px] py-4 rounded-full overflow-hidden transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed group"
                  style={{
                    background: 'linear-gradient(145deg, #c026d3 0%, #a800aa 50%, #800082 100%)',
                    minHeight: '56px', // Fixed height to prevent jumping
                    boxShadow: `
                      0 1px 0 0 rgba(255,255,255,0.3) inset,
                      0 -1px 0 0 rgba(0,0,0,0.2) inset,
                      0 6px 0 0 #800082,
                      0 10px 20px -4px rgba(168,0,170,0.4),
                      0 0 40px -10px rgba(246,90,242,0.5)
                    `
                  }}
                  onMouseEnter={(e) => {
                    if (!isCapturing) {
                      e.currentTarget.style.boxShadow = `
                        0 1px 0 0 rgba(255,255,255,0.4) inset,
                        0 -1px 0 0 rgba(0,0,0,0.2) inset,
                        0 8px 0 0 #800082,
                        0 14px 28px -4px rgba(168,0,170,0.5),
                        0 0 60px -5px rgba(246,90,242,0.7)
                      `;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `
                      0 1px 0 0 rgba(255,255,255,0.3) inset,
                      0 -1px 0 0 rgba(0,0,0,0.2) inset,
                      0 6px 0 0 #800082,
                      0 10px 20px -4px rgba(168,0,170,0.4),
                      0 0 40px -10px rgba(246,90,242,0.5)
                    `;
                  }}
                >
                  {/* Top highlight */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none opacity-40"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'
                    }}
                  />
                  <span className="relative z-10 transition-opacity duration-300">
                    {isCapturing
                      ? (language === 'zh' ? loadingMessages[loadingMessageIndex].zh : loadingMessages[loadingMessageIndex].en)
                      : (language === 'zh' ? '保存为图片' : 'Save as Image')
                    }
                  </span>
                </button>

                {/* Error Message */}
                {imageError && (
                  <div className="flex items-start gap-3 p-4 bg-[#fff5f5] border border-[#ff6b6b] rounded-lg">
                    <span className="text-[20px] flex-shrink-0">⚠️</span>
                    <div className="flex-1">
                      <p className="font-72-brand text-[14px] text-[#d63031] leading-[1.5]">
                        {imageError}
                      </p>
                      <button
                        onClick={() => {
                          setImageError(null);
                          handleShare();
                        }}
                        className="mt-2 font-jetbrains-mono text-[12px] text-[#800082] hover:text-[#a100c2] active:text-[#a100c2] underline transition-colors"
                      >
                        {language === 'zh' ? '重试' : 'Retry'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Congratulations Card - Enhanced with animations and confetti */}
            <div
              className="bg-gradient-to-br from-white via-[#fef5fb] to-white border-2 border-[#a800aa] rounded drop-shadow-[0px_4px_12px_rgba(168,0,170,0.2)] p-4 lg:p-\[33px\] flex flex-col gap-6 transition-all duration-300 hover:drop-shadow-[0px_8px_20px_rgba(168,0,170,0.4)] hover:scale-[1.02] animate-pulse-subtle"
              style={{
                animation: 'pulse-glow 3s ease-in-out infinite'
              }}
              onMouseEnter={() => {
                // Trigger confetti effect
                const duration = 2000;
                const animationEnd = Date.now() + duration;

                const randomInRange = (min: number, max: number) => {
                  return Math.random() * (max - min) + min;
                };

                const interval = setInterval(() => {
                  const timeLeft = animationEnd - Date.now();

                  if (timeLeft <= 0) {
                    return clearInterval(interval);
                  }

                  const particleCount = 3;

                  confetti({
                    particleCount,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                      x: randomInRange(0.1, 0.3),
                      y: Math.random() - 0.2
                    },
                    colors: ['#A100C2', '#FFC933', '#64EDD2', '#7858FF', '#f65af2']
                  });

                  confetti({
                    particleCount,
                    startVelocity: 30,
                    spread: 360,
                    origin: {
                      x: randomInRange(0.7, 0.9),
                      y: Math.random() - 0.2
                    },
                    colors: ['#A100C2', '#FFC933', '#64EDD2', '#7858FF', '#f65af2']
                  });
                }, 250);
              }}
            >
              {/* Title */}
              <div className="flex flex-col items-center gap-3">
                <h2 className="font-space-grotesk font-normal text-[30px] leading-[36px] tracking-[-0.75px] text-center">
                  <span className="font-space-grotesk font-normal text-[36px]">🎁 </span>
                  <span className="text-[#a800aa] font-bold">Congratulations!</span>
                </h2>
                <p className="font-space-grotesk font-normal text-[18px] leading-[28px] text-[#534150] text-center pt-4">
                  You win a prize!<br />
                  <span className="font-bold text-[#a800aa]">Claim Prize</span> at Impulse26 China Networking Party at 15:05
                </p>
              </div>

              {/* Information Box */}
              <div className="pt-2">
                <div className="bg-gradient-to-br from-[#fbe3f4] to-[#f8d5f0] border-2 border-[#d8bfd1] rounded p-[9px] flex flex-col gap-4 shadow-inner">
                  {/* Where */}
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      Where?
                    </p>
                    <p className="font-jetbrains-mono font-bold text-[14px] leading-[20px] text-[#a800aa]">
                      Pvg03 C1.1, Lecturing Studio (aka Digital School)
                    </p>
                  </div>

                  {/* When */}
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      When
                    </p>
                    <p className="font-jetbrains-mono font-bold text-[14px] leading-[20px] text-[#a800aa]">
                      15:05, September 3rd, 2026
                    </p>
                  </div>

                  {/* How */}
                  <div className="flex flex-col gap-2.5">
                    <p className="font-jetbrains-mono font-medium text-[10px] leading-[15px] text-[#534150] uppercase tracking-wider">
                      How
                    </p>
                    <p className="font-jetbrains-mono font-bold text-[14px] leading-[20px] text-[#a800aa]">
                      Show your screenshot of this result to Staffs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 8 columns */}
          {/* Right Content Area: Full width on mobile, 8 columns on desktop */}
          <div className="lg:col-span-8 flex flex-col gap-6 lg:gap-12">
            {/* Dimensions Section */}
            <div
              className="rounded-3xl p-6 lg:p-8 flex flex-col gap-8 transition-all duration-300"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 20px 60px -15px rgba(168,0,170,0.2),
                  0 12px 36px -12px rgba(168,0,170,0.15)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)';
              }}
            >
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/Dimension.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-poppins font-bold text-[20px] lg:text-[22px] leading-tight tracking-tight uppercase" style={{ color: impulseColorText }}>
                  {t('result.dimensions')}
                </h4>
              </div>

              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-x-12 lg:gap-y-8">
                {/* Signal vs Solution */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#f65af2]">
                      SIGNAL ({Math.round((displayScores.Signal / (displayScores.Signal + displayScores.Solution)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#00b5bd]">
                      SOLUTION ({Math.round((displayScores.Solution / (displayScores.Signal + displayScores.Solution)) * 100)}%)
                    </span>
                  </div>
                  <div className="h-8 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 rounded-md transition-all duration-300"
                      style={{
                        backgroundColor: displayScores.Signal >= displayScores.Solution ? '#f65af2' : '#00b5bd',
                        left: displayScores.Signal >= displayScores.Solution ? '4px' : 'auto',
                        right: displayScores.Solution > displayScores.Signal ? '4px' : 'auto',
                        width: `calc(${Math.round((Math.max(displayScores.Signal, displayScores.Solution) / (displayScores.Signal + displayScores.Solution)) * 100)}% - 8px)`,
                        boxShadow: displayScores.Signal >= displayScores.Solution
                          ? '0px 0px 0px rgba(246,90,242,0)'
                          : '0px 0px 0px rgba(0,181,189,0)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = displayScores.Signal >= displayScores.Solution
                          ? '0px 0px 12px #f65af2'
                          : '0px 0px 12px #00b5bd';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = displayScores.Signal >= displayScores.Solution
                          ? '0px 0px 0px rgba(246,90,242,0)'
                          : '0px 0px 0px rgba(0,181,189,0)';
                      }}
                    />
                  </div>
                </div>

                {/* Human vs Machine */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#00b5bd]">
                      HUMAN ({Math.round((displayScores.Human / (displayScores.Human + displayScores.Machine)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#8e5aff]">
                      MACHINE ({Math.round((displayScores.Machine / (displayScores.Human + displayScores.Machine)) * 100)}%)
                    </span>
                  </div>
                  <div className="h-8 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 rounded-md transition-all duration-300"
                      style={{
                        backgroundColor: displayScores.Human >= displayScores.Machine ? '#00b5bd' : '#8e5aff',
                        left: displayScores.Human >= displayScores.Machine ? '4px' : 'auto',
                        right: displayScores.Machine > displayScores.Human ? '4px' : 'auto',
                        width: `calc(${Math.round((Math.max(displayScores.Human, displayScores.Machine) / (displayScores.Human + displayScores.Machine)) * 100)}% - 8px)`,
                        boxShadow: displayScores.Human >= displayScores.Machine
                          ? '0px 0px 0px rgba(0,181,189,0)'
                          : '0px 0px 0px rgba(142,90,255,0)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = displayScores.Human >= displayScores.Machine
                          ? '0px 0px 12px #00b5bd'
                          : '0px 0px 12px #8e5aff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = displayScores.Human >= displayScores.Machine
                          ? '0px 0px 0px rgba(0,181,189,0)'
                          : '0px 0px 0px rgba(142,90,255,0)';
                      }}
                    />
                  </div>
                </div>

                {/* Explore vs Align */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#8e5aff]">
                      EXPLORE ({Math.round((displayScores.Explore / (displayScores.Explore + displayScores.Align)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#f4bf28]">
                      ALIGN ({Math.round((displayScores.Align / (displayScores.Explore + displayScores.Align)) * 100)}%)
                    </span>
                  </div>
                  <div className="h-8 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 rounded-md transition-all duration-300"
                      style={{
                        backgroundColor: displayScores.Explore >= displayScores.Align ? '#8e5aff' : '#f4bf28',
                        left: displayScores.Explore >= displayScores.Align ? '4px' : 'auto',
                        right: displayScores.Align > displayScores.Explore ? '4px' : 'auto',
                        width: `calc(${Math.round((Math.max(displayScores.Explore, displayScores.Align) / (displayScores.Explore + displayScores.Align)) * 100)}% - 8px)`,
                        boxShadow: displayScores.Explore >= displayScores.Align
                          ? '0px 0px 0px rgba(142,90,255,0)'
                          : '0px 0px 0px rgba(244,191,40,0)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = displayScores.Explore >= displayScores.Align
                          ? '0px 0px 12px #8e5aff'
                          : '0px 0px 12px #f4bf28';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = displayScores.Explore >= displayScores.Align
                          ? '0px 0px 0px rgba(142,90,255,0)'
                          : '0px 0px 0px rgba(244,191,40,0)';
                      }}
                    />
                  </div>
                </div>

                {/* Spark vs Stabilize */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#f4bf28]">
                      SPARK ({Math.round((displayScores.Spark / (displayScores.Spark + displayScores.Stabilize)) * 100)}%)
                    </span>
                    <span className="font-jetbrains-mono font-medium text-[12px] leading-[16px] text-[#f65af2]">
                      STABILIZE ({Math.round((displayScores.Stabilize / (displayScores.Spark + displayScores.Stabilize)) * 100)}%)
                    </span>
                  </div>
                  <div className="h-8 bg-white border border-[rgba(0,0,0,0.08)] rounded-lg relative group cursor-pointer">
                    <div
                      className="absolute top-1 bottom-1 rounded-md transition-all duration-300"
                      style={{
                        backgroundColor: displayScores.Spark >= displayScores.Stabilize ? '#f4bf28' : '#f65af2',
                        left: displayScores.Spark >= displayScores.Stabilize ? '4px' : 'auto',
                        right: displayScores.Stabilize > displayScores.Spark ? '4px' : 'auto',
                        width: `calc(${Math.round((Math.max(displayScores.Spark, displayScores.Stabilize) / (displayScores.Spark + displayScores.Stabilize)) * 100)}% - 8px)`,
                        boxShadow: displayScores.Spark >= displayScores.Stabilize
                          ? '0px 0px 0px rgba(244,191,40,0)'
                          : '0px 0px 0px rgba(246,90,242,0)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = displayScores.Spark >= displayScores.Stabilize
                          ? '0px 0px 12px #f4bf28'
                          : '0px 0px 12px #f65af2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = displayScores.Spark >= displayScores.Stabilize
                          ? '0px 0px 0px rgba(244,191,40,0)'
                          : '0px 0px 0px rgba(246,90,242,0)';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Signal Section */}
            <div
              className="rounded-3xl p-6 lg:p-8 flex flex-col gap-6 transition-all duration-300"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px -15px rgba(168,0,170,0.2), 0 12px 36px -12px rgba(168,0,170,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)';
              }}
            >
              <div className="flex gap-3 items-center">
                <img src="/assets/icons/Signal.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-poppins font-bold text-[20px] lg:text-[22px] leading-tight tracking-tight text-[#231821] uppercase">
                  {t('result.signalTitle')}
                </h4>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-space-grotesk font-normal text-[16px] leading-[26px] text-[#231821]">
                  {result.signal[language]}
                </p>
              </div>
            </div>

            {/* Pulse Section */}
            <div
              className="rounded-3xl p-6 lg:p-8 flex flex-col gap-6 transition-all duration-300"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px -15px rgba(168,0,170,0.2), 0 12px 36px -12px rgba(168,0,170,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(168,0,170,0.15), 0 8px 24px -8px rgba(168,0,170,0.1)';
              }}
            >
              <div className="flex gap-3 items-center">
                <img src="/assets/icons/Impulse.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                <h4 className="font-poppins font-bold text-[20px] lg:text-[22px] leading-tight tracking-tight text-[#231821] uppercase">
                  {t('result.pulseTitle')}
                </h4>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-72-brand font-medium text-[16px] leading-[26px] text-[#231821]">
                  {result.pulse[language]}
                </p>
                {/* Hashtags - Twitter Style */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {(RESULT_HASHTAGS[result.key]?.[language] || '').split(' ').filter(tag => tag.trim()).map((tag, index) => (
                    <span
                      key={index}
                      className="font-jetbrains-mono text-[12px] lg:text-[13px] px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: hexToRgba(impulseColor, 0.2),
                        color: impulseColorText,
                        border: `1.5px solid ${hexToRgba(impulseColor, 0.4)}`,
                        fontWeight: '500'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Risks Section */}
            <div
              className="bg-[rgba(255,218,214,0.1)] border border-[#ba1a1a] rounded-3xl p-6 lg:p-8 flex flex-col gap-6 transition-all duration-300"
              style={{
                boxShadow: '0 12px 40px -12px rgba(186,26,26,0.15), 0 8px 24px -8px rgba(186,26,26,0.1)',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 60px -15px rgba(186,26,26,0.25), 0 12px 36px -12px rgba(186,26,26,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(186,26,26,0.15), 0 8px 24px -8px rgba(186,26,26,0.1)';
              }}
            >
              <div className="flex gap-3 items-center">
                <img src="/assets/icons/Risk.svg" alt="" className="w-5 h-5" />
                <h4 className="font-poppins font-bold text-[20px] lg:text-[22px] leading-tight tracking-tight text-[#ba1a1a] uppercase">
                  {t('result.risksTitle')}
                </h4>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-72-brand font-medium text-[16px] leading-[26px] text-[#231821]">
                  {result.risk[language]}
                </p>
              </div>
            </div>

            {/* Punchline Section - Better readability with gradient */}
            <div
              className="rounded-3xl p-6 lg:p-8 shadow-lg relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${impulseColor} 0%, ${hexToRgba(impulseColor, 0.85)} 100%)`
              }}
            >
              {/* Add a subtle overlay for better text contrast */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 70%)'
                }}
              />
              <p
                className="font-space-grotesk font-bold text-[18px] lg:text-[24px] leading-[24px] lg:leading-[30px] text-center mb-3 lg:mb-4 relative z-10"
                style={{
                  color: punchlineTextColor,
                  textShadow: punchlineTextColor === '#ffffff'
                    ? '0 2px 8px rgba(0,0,0,0.3)'
                    : '0 1px 4px rgba(0,0,0,0.1)'
                }}
              >
                {result.punchline[language]}
              </p>
              <p
                className="font-72-brand font-medium italic text-[16px] lg:text-[20px] leading-[24px] lg:leading-[28px] text-center relative z-10"
                style={{
                  color: punchlineTextColor,
                  opacity: punchlineTextColor === '#ffffff' ? 0.95 : 0.8,
                  textShadow: punchlineTextColor === '#ffffff'
                    ? '0 1px 4px rgba(0,0,0,0.2)'
                    : '0 1px 3px rgba(0,0,0,0.08)'
                }}
              >
                {language === 'zh'
                  ? `"${result.punchline.en}"`
                  : `「${result.punchline.zh}」`
                }
              </p>
            </div>

            {/* Meeting Behavior Section */}
            {(language === 'zh' ? result.meetingBehaviorCN : result.meetingBehaviorEN) && (
              <div
                className="rounded p-4 lg:p-\[33px\] flex flex-col gap-6 transition-all duration-300"
                style={{
                  backgroundColor: cardBg,
                  borderColor: cardBorder,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  transition: 'box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0px 0px 20px ${impulseColor}30, 0px 0px 40px ${impulseColor}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div className="flex gap-3 items-center mb-4">
                  <img src="/assets/icons/Picto_Team.svg" alt="" className="w-5 h-5" style={{ filter: `brightness(0) saturate(100%)`, opacity: 0.8 }} />
                  <h4
                    className="font-space-grotesk font-bold text-[24px] leading-[32px] tracking-[-0.6px] uppercase"
                    style={{ color: impulseColorText }}
                  >
                    {language === 'zh' ? '会议表现' : 'MEETING BEHAVIOR'}
                  </h4>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="font-72-brand font-medium text-[18px] leading-[28px] text-[#231821] whitespace-pre-line">
                    {language === 'zh' ? result.meetingBehaviorCN : result.meetingBehaviorEN}
                  </p>
                </div>
              </div>
            )}

            {/* Library Grid */}
            <div className="flex flex-col gap-8">
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/Library.svg" alt="" className="w-5 h-5" />
                <h4 className="font-poppins font-bold text-[20px] lg:text-[22px] leading-tight tracking-tight text-[#a800aa] uppercase">
                  THE IMPULSE LIBRARY
                </h4>
              </div>

              <div className="bg-white border border-[#e5e2e8] rounded-3xl p-6 lg:p-8 shadow-soft">
                <div className="grid grid-cols-4 gap-3 lg:gap-4">
                  {getAllResultKeys().map(key => {
                    const isUnlocked = key === result.key;
                    const isHovered = hoveredLockedKey === key;

                    return (
                      <div key={key} className="relative">
                        <button
                          onClick={() => isUnlocked && navigate(`/result/${key}`)}
                          onMouseEnter={() => {
                            if (!isUnlocked) {
                              console.log('Hovering locked key:', key);
                              setHoveredLockedKey(key);
                            }
                          }}
                          onMouseLeave={() => {
                            console.log('Leave key:', key);
                            setHoveredLockedKey(null);
                          }}
                          disabled={!isUnlocked}
                          className={`
                            aspect-square w-full rounded-lg overflow-hidden flex items-center justify-center transition-all relative
                            ${isUnlocked
                              ? 'shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] hover:shadow-[0px_6px_8px_-1px_rgba(0,0,0,0.15)] hover:scale-105'
                              : 'opacity-60 hover:opacity-80'
                            }
                          `}
                          style={{ cursor: isUnlocked ? 'pointer' : 'not-allowed' }}
                        >
                          {isUnlocked ? (
                            <img
                              key={`unlocked-${key}`}
                              src={`/assets/result-cards/${key}.png?v=20260805`}
                              alt={key}
                              className="w-full h-full object-cover"
                              style={{
                                filter: `drop-shadow(0 0 8px ${impulseColor}80) drop-shadow(0 0 16px ${impulseColor}60) drop-shadow(0 0 24px ${impulseColor}40)`
                              }}
                            />
                          ) : (
                            <div className="relative w-full h-full">
                              <img
                                key={`locked-${key}`}
                                src={`/assets/result-cards-locked/${key}.png?v=20260805`}
                                alt={`${key} Locked`}
                                className="w-full h-full object-cover"
                              />
                              {/* Key text overlay for locked states - No background */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-jetbrains-mono font-bold text-[14px] lg:text-[16px] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                  {key}
                                </span>
                              </div>
                            </div>
                          )}
                        </button>

                        {/* Popover for locked items */}
                        {!isUnlocked && isHovered && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30">
                            <div className="bg-[#231821] text-white px-4 py-3 rounded shadow-xl whitespace-nowrap">
                              <p className="font-jetbrains-mono text-[11px] leading-[16px]">
                                Ask others for their results!
                              </p>
                              {/* Arrow */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2">
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#231821]" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom Button - Save Image Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#fff7f9] border-t-2 border-[#a800aa] px-4 py-4 z-50 drop-shadow-[0px_-4px_2px_#f1ddea]">
        <button
          onClick={handleShare}
          disabled={isCapturing}
          className="relative w-full text-white font-poppins font-semibold text-[15px] leading-[22px] py-3 rounded-full flex items-center justify-center gap-2 disabled:opacity-50 overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #c026d3 0%, #a800aa 50%, #800082 100%)',
            minHeight: '56px', // Fixed height to prevent jumping
            boxShadow: `
              0 1px 0 0 rgba(255,255,255,0.3) inset,
              0 4px 0 0 #800082,
              0 8px 16px -4px rgba(168,0,170,0.4)
            `
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[30%] pointer-events-none opacity-40"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)'
            }}
          />
          <span className="relative z-10 text-[18px]">↗</span>
          <span className="relative z-10 transition-opacity duration-300">
            {isCapturing
              ? (language === 'zh' ? loadingMessages[loadingMessageIndex].zh : loadingMessages[loadingMessageIndex].en)
              : (language === 'zh' ? '保存为图片' : 'Save as Image')
            }
          </span>
        </button>
      </div>

      <Footer />

      {/* Hidden Share Card - for image generation only */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none">
        {result && (
          <ShareCard
            ref={shareCardRef}
            result={result}
            language={language}
          />
        )}
      </div>
    </div>
  );
};
