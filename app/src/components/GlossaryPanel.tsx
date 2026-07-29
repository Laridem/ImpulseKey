import { useState } from 'react';
import { useLanguage } from '../i18n';

interface GlossaryTerm {
  term: string;
  definition: {
    en: string;
    zh: string;
  };
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'API',
    definition: {
      en: 'Application Programming Interface - a channel for systems to exchange data',
      zh: '应用程序接口 - 系统之间交换数据的通道'
    }
  },
  {
    term: 'Sprint',
    definition: {
      en: 'Work cycle in agile development, typically 1-2 weeks',
      zh: '敏捷开发中的工作周期，通常1-2周'
    }
  },
  {
    term: 'PM',
    definition: {
      en: 'Product Manager - responsible for product strategy and roadmap',
      zh: 'Product Manager（产品经理）- 负责产品策略和规划'
    }
  },
  {
    term: 'Dashboard',
    definition: {
      en: 'Visual display of key metrics and data insights',
      zh: '数据仪表盘 - 用于展示关键指标和数据洞察'
    }
  },
  {
    term: 'Backlog',
    definition: {
      en: 'List of pending tasks or features to be developed',
      zh: '待办事项列表 - 待开发的任务或功能清单'
    }
  },
  {
    term: 'Hotfix',
    definition: {
      en: 'Emergency patch to fix critical production issues',
      zh: '紧急修复补丁 - 用于修复生产环境的严重问题'
    }
  },
  {
    term: 'Code Review',
    definition: {
      en: 'Process of examining code changes before merging',
      zh: '代码审查 - 在合并代码前检查代码变更的流程'
    }
  },
  {
    term: 'Feature Flag',
    definition: {
      en: 'Toggle to control feature rollout without deploying new code',
      zh: '功能开关 - 无需重新部署即可控制功能上线的开关'
    }
  },
  {
    term: 'Fiori',
    definition: {
      en: 'SAP\'s design system and UX guidelines for enterprise applications',
      zh: 'SAP的设计系统和用户体验规范，用于企业应用'
    }
  },
  {
    term: 'HANA',
    definition: {
      en: 'SAP\'s high-performance in-memory database',
      zh: 'SAP的高性能内存数据库'
    }
  },
  {
    term: 'Joule',
    definition: {
      en: 'SAP\'s AI assistant for enterprise workflows',
      zh: 'SAP的AI助手，用于企业工作流程'
    }
  },
  {
    term: 'OData',
    definition: {
      en: 'Open Data Protocol - RESTful API standard for data services',
      zh: '开放数据协议 - RESTful API的数据服务标准'
    }
  },
  {
    term: 'Edge Case',
    definition: {
      en: 'Rare scenario that needs to be handled but occurs infrequently',
      zh: '边缘场景 - 不常见但需要处理的情况'
    }
  },
  {
    term: 'P1 Incident',
    definition: {
      en: 'Highest priority production outage affecting critical systems',
      zh: '最高优先级的生产故障，影响关键系统'
    }
  },
  {
    term: 'Validation',
    definition: {
      en: 'Process of checking if data meets required format and rules',
      zh: '数据校验 - 检查数据是否符合要求的格式和规则'
    }
  }
];

export const GlossaryPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <>
      {/* Glossary Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 right-4 z-40 px-4 py-2 bg-[#f7e3ef] border border-[#a800aa] rounded-lg shadow-soft hover:shadow-soft-lg transition-all flex items-center gap-2 font-72-brand text-body-sm text-[#a800aa]"
        aria-label={language === 'zh' ? '术语帮助' : 'Glossary'}
      >
        <span>💡</span>
        <span>{language === 'zh' ? '术语帮助' : 'Glossary'}</span>
      </button>

      {/* Glossary Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white border-l border-[#d8bfd1] shadow-2xl z-50 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#ffeff8] border-b border-[#d8bfd1] p-6 flex justify-between items-center">
              <h2 className="font-space-grotesk font-bold text-[24px] text-[#231821]">
                {language === 'zh' ? '术语词汇表' : 'Glossary'}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#a800aa] hover:text-[#800082] transition-colors text-2xl"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Terms List */}
            <div className="p-6 space-y-4">
              {GLOSSARY_TERMS.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f7e3ef] border border-[#d8bfd1] rounded-lg p-4"
                >
                  <h3 className="font-jetbrains-mono font-bold text-[14px] text-[#a800aa] mb-2">
                    {item.term}
                  </h3>
                  <p className="font-72-brand text-body-sm text-[#534150] leading-relaxed">
                    {language === 'zh' ? item.definition.zh : item.definition.en}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[#ffeff8] border-t border-[#d8bfd1] p-4 text-center">
              <p className="font-72-brand text-body-xs text-[#867181]">
                {language === 'zh'
                  ? '点击背景或 × 关闭此面板'
                  : 'Click backdrop or × to close'}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
