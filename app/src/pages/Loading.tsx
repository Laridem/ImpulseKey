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
  const { resultKey } = useTest();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Top Left Corner Text */}
      <div className="absolute top-8 left-8 text-orange-500 text-sm font-medium tracking-wider">
        {t('loading.impulse')}
      </div>

      {/* Main Content */}
      <div className="max-w-2xl w-full">
        {/* Center Frame with Key */}
        <div className="relative mb-12">
          {/* Corner Brackets */}
          <div className="relative w-80 h-80 mx-auto">
            {/* Top Left Corner */}
            <div className="absolute top-0 left-0 w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-orange-500"></div>
              <div className="absolute top-0 left-0 w-0.5 h-full bg-orange-500"></div>
            </div>
            {/* Top Right Corner */}
            <div className="absolute top-0 right-0 w-12 h-12">
              <div className="absolute top-0 right-0 w-full h-0.5 bg-orange-500"></div>
              <div className="absolute top-0 right-0 w-0.5 h-full bg-orange-500"></div>
            </div>
            {/* Bottom Left Corner */}
            <div className="absolute bottom-0 left-0 w-12 h-12">
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
              <div className="absolute bottom-0 left-0 w-0.5 h-full bg-orange-500"></div>
            </div>
            {/* Bottom Right Corner */}
            <div className="absolute bottom-0 right-0 w-12 h-12">
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-orange-500"></div>
              <div className="absolute bottom-0 right-0 w-0.5 h-full bg-orange-500"></div>
            </div>

            {/* Center Key with Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 blur-3xl bg-orange-500 opacity-30 animate-pulse"></div>

                {/* Key Icon - Using Impulse Key Visual */}
                <div className="relative z-10 w-32 h-32 animate-pulse">
                  <img
                    src="/impulse-key-visual.svg"
                    alt="Key"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Horizontal Line through Key */}
                <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 w-64 h-0.5 bg-orange-500 -translate-x-1/2"></div>
              </div>
            </div>

            {/* Progress Bar at Bottom of Frame */}
            <div className="absolute bottom-12 left-12 right-12">
              <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Label */}
        <div className="text-center mb-4">
          <span className="text-orange-500 text-sm font-medium tracking-wider">
            {t('loading.protocol')}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          {t('loading.title')}
        </h1>

        {/* Loading Steps Box */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm border border-gray-700 mb-8">
          <div className="space-y-3">
            {loadingSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 transition-all duration-500 ${
                  index <= currentStep ? 'opacity-100' : 'opacity-30'
                }`}
              >
                {index < currentStep ? (
                  <span className="text-orange-500 text-sm flex-shrink-0 mt-0.5">✓</span>
                ) : index === currentStep ? (
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin flex-shrink-0 mt-0.5"></div>
                ) : (
                  <span className="text-gray-600 text-sm flex-shrink-0 mt-0.5">○</span>
                )}
                <span className={`text-sm ${index <= currentStep ? 'text-gray-300' : 'text-gray-600'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-500 mb-1">{t('loading.status.encryption')}</div>
            <div className="text-white font-medium">{t('loading.status.encryptionValue')}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">{t('loading.status.status')}</div>
            <div className="text-orange-500 font-medium">{t('loading.status.statusValue')}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">{t('loading.status.version')}</div>
            <div className="text-white font-medium">{t('loading.status.versionValue')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
