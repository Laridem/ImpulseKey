import { Question as QuestionRaw } from '../data/types'

/**
 * Transform questions from storage format to display format
 */
export function transformQuestions(questions: QuestionRaw[]): QuestionRaw[] {
  return questions.map(q => ({
    ...q,
    text: {
      en: q.textEN,
      zh: q.textCN
    },
    options: q.options.map(opt => ({
      ...opt,
      text: {
        en: opt.textEN,
        zh: opt.textCN
      },
      humor: {
        en: opt.humorEN,
        zh: opt.humorCN
      },
      score: opt.scores
    }))
  }))
}
