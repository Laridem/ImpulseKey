import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../context/TestContext';
import { useTranslation } from '../i18n';
import { useLanguage } from '../i18n';

// Result-specific loading messages (added on top of random messages)
const resultSpecificSteps: Record<string, { zh: string[]; en: string[] }> = {
  'VOC': {
    zh: ['正在倾听用户的每一个叹息......', '正在收集那些"其实还好"背后的真实声音......'],
    en: ['Listening to every user sigh......', 'Collecting the real voices behind "it\'s actually okay"......']
  },
  'FIORI': {
    zh: ['正在检查你的 Fiori 控件使用规范......', '正在评估你对 SAP 设计语言的理解......'],
    en: ['Checking your Fiori control usage standards......', 'Evaluating your understanding of SAP design language......']
  },
  'PIXEL': {
    zh: ['正在测量你对像素的执念程度......', '正在检测你的设计稿对齐强迫症......'],
    en: ['Measuring your pixel obsession level......', 'Detecting your design alignment OCD......']
  },
  'JOULE': {
    zh: ['正在询问 Joule 你的下一个问题是什么......', '正在等待 AI 给出"更智能"的建议......'],
    en: ['Asking Joule what your next question will be......', 'Waiting for AI to give "smarter" suggestions......']
  },
  'CTRL': {
    zh: ['正在计算你按 Ctrl+Z 的次数......', '正在检查你的系统控制倾向......'],
    en: ['Counting your Ctrl+Z presses......', 'Checking your system control tendencies......']
  },
  'LOGS': {
    zh: ['正在翻阅你从不看的日志文件......', '正在寻找那条被埋没的关键错误......'],
    en: ['Browsing through logs you never read......', 'Searching for that buried critical error......']
  },
  'API': {
    zh: ['正在调用你的第 127 个 API 端点......', '正在处理你的异步请求......'],
    en: ['Calling your 127th API endpoint......', 'Processing your async requests......']
  }
};

export const Loading = () => {
  const navigate = useNavigate();
  const { resultKey, resetTest } = useTest();
  const t = useTranslation();
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Combine base steps, random steps, and result-specific steps
  const loadingSteps = useMemo(() => {
    const baseSteps = [
      t('loading.steps.0'),
      t('loading.steps.1'),
      t('loading.steps.2'),
      t('loading.steps.3'),
      t('loading.steps.4'),
      t('loading.steps.5')
    ];

    // Get random steps from i18n
    const randomSteps: string[] = [];
    let i = 0;
    while (true) {
      const step = t(`loading.randomSteps.${i}`);
      if (step === `loading.randomSteps.${i}`) break; // No more steps
      randomSteps.push(step);
      i++;
    }

    // Get result-specific steps if available
    const specificSteps: string[] = [];
    if (resultKey && resultSpecificSteps[resultKey]) {
      const steps = resultSpecificSteps[resultKey];
      specificSteps.push(...(language === 'zh' ? steps.zh : steps.en));
    }

    // Randomly select 3 from random steps
    const shuffledRandom = [...randomSteps].sort(() => Math.random() - 0.5);
    const selectedRandom = shuffledRandom.slice(0, 3);

    // Combine: 3 base + 2 result-specific + 3 random
    return [
      ...baseSteps.slice(0, 3),
      ...specificSteps,
      ...selectedRandom
    ];
  }, [t, resultKey, language]);

  useEffect(() => {
    // Progress bar animation - adjusted for 8 seconds total
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.25; // 100 / (8000ms / 100ms) = 1.25 per tick
      });
    }, 100);

    // Step animation - show each step for 1 second
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000); // Increased from 800ms to 1000ms for better readability

    // Navigate after 8 seconds - enough time for all 8 steps
    const timer = setTimeout(() => {
      if (resultKey) {
        navigate(`/result/${resultKey}`);
      } else {
        navigate('/');
      }
    }, 8000); // Increased from 5000ms to 8000ms

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [resultKey, navigate]);

  return (
    <div className="min-h-screen bg-[#231821] flex flex-col relative overflow-hidden">
      {/* Header with Shell Bar - matching other pages */}
      <header className="bg-[#231821] border-b border-[#534150]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <span className="font-space-grotesk font-bold text-headline-md text-[#a800aa] tracking-tight">
              IMPULSE KEYS
            </span>
            <img
              src="/assets/anvils.png"
              alt="Anvils"
              className="w-[59.2px] h-8 object-contain"
            />
          </div>

          {/* Right side: Retake Test Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                resetTest();
                navigate('/');
              }}
              className="px-6 py-2 bg-[#a800aa] text-white font-jetbrains-mono font-medium text-[12px] leading-[18px] uppercase rounded-full hover:bg-[#800082] transition-colors"
            >
              {t('common.retakeTest')}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - centered with proper spacing */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full">
        {/* Center Frame with Key */}
        <div className="relative mb-16">
          {/* Corner Brackets with Kinetic Colors */}
          <div className="relative w-96 h-96 mx-auto">
            {/* Top Left Corner - Teal */}
            <div className="absolute -top-4 -left-4 w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#00b098]"></div>
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00b098]"></div>
            </div>
            {/* Top Right Corner - Magenta */}
            <div className="absolute -top-4 -right-4 w-16 h-16">
              <div className="absolute top-0 right-0 w-full h-1 bg-[#f65af2]"></div>
              <div className="absolute top-0 right-0 w-1 h-full bg-[#f65af2]"></div>
            </div>
            {/* Bottom Left Corner - Teal */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00b098]"></div>
              <div className="absolute bottom-0 left-0 w-1 h-full bg-[#00b098]"></div>
            </div>
            {/* Bottom Right Corner - Magenta */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16">
              <div className="absolute bottom-0 right-0 w-full h-1 bg-[#f65af2]"></div>
              <div className="absolute bottom-0 right-0 w-1 h-full bg-[#f65af2]"></div>
            </div>

            {/* Main Frame Container */}
            <div className="absolute inset-0 bg-[#2d2028] border-2 border-[#a800aa] rounded-lg shadow-soft-lg flex items-center justify-center">
              {/* Center Key with Glow */}
              <div className="relative">
                {/* Cyan + Magenta Glow Effect */}
                <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-[#00f5e1] to-[#f65af2] opacity-40 animate-pulse"></div>

                {/* Key Icon */}
                <div className="relative z-10 w-40 h-40">
                  <img
                    src="/assets/impulse-key-visual.png"
                    alt="Key"
                    className="w-full h-full object-contain animate-pulse"
                  />
                </div>
              </div>

              {/* System Analysis Label */}
              <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
                <p className="font-jetbrains-mono font-medium text-[12px] leading-[18px] text-[#00f5e1] uppercase text-center">
                  SYSTEM ANALYSIS IN PROGRESS
                </p>
              </div>

              {/* Analyzing Text with Progress */}
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                <p className="font-space-grotesk font-bold text-[18px] text-white">
                  ANALYZING... {Math.round(progress)}%
                </p>
              </div>

              {/* Progress Bar at Bottom of Frame */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="w-full h-2 bg-[#534150] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#a800aa] to-[#f65af2] transition-all duration-300 ease-linear rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Impulse 26 Logo Badge */}
              <div className="absolute bottom-4 right-6">
                <p className="font-jetbrains-mono font-medium text-[10px] text-[#00f5e1] uppercase">
                  IMPULSE 26
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Label */}
        <div className="text-center mb-6">
          <span className="font-jetbrains-mono font-medium text-[12px] leading-[18px] text-[#00f5e1] uppercase tracking-normal">
            {t('loading.protocol')}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-space-grotesk font-bold text-[32px] leading-[40px] tracking-tight text-white text-center mb-12">
          {t('loading.title')}
        </h1>

        {/* Loading Steps Box */}
        <div className="bg-[#2d2028] bg-opacity-80 rounded-lg p-8 backdrop-blur-sm border border-[#534150] mb-12">
          <div className="space-y-4">
            {loadingSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 transition-all duration-500 ${
                  index <= currentStep ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {index < currentStep ? (
                  <span className="text-[#00b098] text-sm flex-shrink-0 mt-0.5 font-bold">✓</span>
                ) : index === currentStep ? (
                  <div className="w-4 h-4 border-2 border-[#f65af2] border-t-transparent rounded-full animate-spin flex-shrink-0 mt-0.5"></div>
                ) : (
                  <span className="text-[#534150] text-sm flex-shrink-0 mt-0.5">○</span>
                )}
                <span className={`font-72-brand text-body-sm ${index <= currentStep ? 'text-white' : 'text-[#534150]'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="font-jetbrains-mono text-[10px] text-[#867181] mb-2 uppercase tracking-normal">
              {t('loading.status.encryption')}
            </div>
            <div className="font-72-brand text-body-sm text-white font-medium">
              {t('loading.status.encryptionValue')}
            </div>
          </div>
          <div>
            <div className="font-jetbrains-mono text-[10px] text-[#867181] mb-2 uppercase tracking-normal">
              {t('loading.status.status')}
            </div>
            <div className="font-72-brand text-body-sm text-[#f65af2] font-bold">
              {t('loading.status.statusValue')}
            </div>
          </div>
          <div>
            <div className="font-jetbrains-mono text-[10px] text-[#867181] mb-2 uppercase tracking-normal">
              {t('loading.status.version')}
            </div>
            <div className="font-72-brand text-body-sm text-white font-medium">
              {t('loading.status.versionValue')}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
