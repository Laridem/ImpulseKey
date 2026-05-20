/**
 * Role Selection Data
 * User's professional role affects dimension scoring with small weight adjustments
 */

import { Pole } from './types';

export interface Role {
  id: string;
  nameZH: string;
  nameEN: string;
  descZH: string;
  descEN: string;
  icon: string; // emoji
  weights: Partial<Record<Pole, number>>; // Small adjustments to dimension scores
}

export const ROLES: Record<string, Role> = {
  product_design: {
    id: 'product_design',
    nameZH: 'Product & Design',
    nameEN: 'Product & Design',
    descZH: 'UX 设计师、产品经理、设计研究员',
    descEN: 'UX Designer, Product Manager, Design Researcher',
    icon: '🎨',
    weights: {
      Human: 2,
      Explore: 2,
      Signal: 1
    }
  },
  engineering: {
    id: 'engineering',
    nameZH: 'Engineering & Development',
    nameEN: 'Engineering & Development',
    descZH: '软件开发、云工程师、DevOps',
    descEN: 'Software Developer, Cloud Engineer, DevOps',
    icon: '💻',
    weights: {
      Machine: 2,
      Solution: 2,
      Stabilize: 1
    }
  },
  data_ai: {
    id: 'data_ai',
    nameZH: 'Data & AI',
    nameEN: 'Data & AI',
    descZH: '数据科学家、AI 工程师、数据分析师',
    descEN: 'Data Scientist, AI/ML Engineer, Data Analyst',
    icon: '🤖',
    weights: {
      Machine: 2,
      Explore: 1,
      Solution: 1
    }
  },
  quality_testing: {
    id: 'quality_testing',
    nameZH: 'Quality & Testing',
    nameEN: 'Quality & Testing',
    descZH: 'QA 工程师、测试自动化、性能测试',
    descEN: 'QA Engineer, Test Automation, Performance Testing',
    icon: '🔍',
    weights: {
      Stabilize: 2,
      Align: 1,
      Machine: 1
    }
  },
  customer_success: {
    id: 'customer_success',
    nameZH: 'Customer Success & Support',
    nameEN: 'Customer Success & Support',
    descZH: '客户成功经理、技术支持、解决方案顾问',
    descEN: 'Customer Success Manager, Technical Support, Consultant',
    icon: '💬',
    weights: {
      Human: 2,
      Signal: 2,
      Align: 1
    }
  },
  business_strategy: {
    id: 'business_strategy',
    nameZH: 'Business & Strategy',
    nameEN: 'Business & Strategy',
    descZH: '业务分析师、战略顾问、项目经理',
    descEN: 'Business Analyst, Strategy Consultant, Project Manager',
    icon: '📊',
    weights: {
      Align: 2,
      Solution: 1,
      Stabilize: 1
    }
  },
  sales_marketing: {
    id: 'sales_marketing',
    nameZH: 'Sales & Marketing',
    nameEN: 'Sales & Marketing',
    descZH: '销售工程师、市场经理、售前顾问',
    descEN: 'Sales Engineer, Marketing Manager, Pre-Sales Consultant',
    icon: '📢',
    weights: {
      Human: 2,
      Spark: 2,
      Explore: 1
    }
  },
  operations: {
    id: 'operations',
    nameZH: 'Operations & Infrastructure',
    nameEN: 'Operations & Infrastructure',
    descZH: 'IT 运维、系统管理员、发布管理',
    descEN: 'IT Operations, System Administrator, Release Manager',
    icon: '⚙️',
    weights: {
      Stabilize: 2,
      Machine: 2,
      Align: 1
    }
  },
  secret: {
    id: 'secret',
    nameZH: "It's a secret",
    nameEN: "It's a secret",
    descZH: '我不想透露我的职能角色',
    descEN: 'I prefer not to disclose my role',
    icon: '🤫',
    weights: {} // No weight adjustment
  }
};

/**
 * Get all role IDs in display order
 */
export function getAllRoleIds(): string[] {
  return [
    'product_design',
    'engineering',
    'data_ai',
    'quality_testing',
    'customer_success',
    'business_strategy',
    'sales_marketing',
    'operations',
    'secret'
  ];
}

/**
 * Get role by ID
 */
export function getRole(roleId: string): Role | undefined {
  return ROLES[roleId];
}
