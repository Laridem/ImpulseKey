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
    descZH: '产品经理、UX 设计师、设计研究员、客户成功经理、技术支持',
    descEN: 'Product Manager, UX Designer, Design Researcher, Customer Success, Technical Support',
    icon: '🎨',
    weights: {
      Human: 2,
      Explore: 2,
      Signal: 2,
      Align: 1
    }
  },
  tech_engineering: {
    id: 'tech_engineering',
    nameZH: 'Technology & Engineering',
    nameEN: 'Technology & Engineering',
    descZH: '软件开发、DevOps、AI 工程师、数据科学家、QA 工程师、IT 运维',
    descEN: 'Software Developer, DevOps, AI/ML Engineer, Data Scientist, QA Engineer, IT Operations',
    icon: '💻',
    weights: {
      Machine: 2,
      Solution: 2,
      Stabilize: 2,
      Explore: 1
    }
  },
  business_strategy: {
    id: 'business_strategy',
    nameZH: 'Business & Strategy',
    nameEN: 'Business & Strategy',
    descZH: '业务分析师、项目经理、战略顾问、销售工程师、市场经理',
    descEN: 'Business Analyst, Project Manager, Strategy Consultant, Sales Engineer, Marketing Manager',
    icon: '📊',
    weights: {
      Align: 2,
      Solution: 2,
      Spark: 1,
      Stabilize: 1
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
    'tech_engineering',
    'business_strategy',
    'secret'
  ];
}

/**
 * Get role by ID
 */
export function getRole(roleId: string): Role | undefined {
  return ROLES[roleId];
}
