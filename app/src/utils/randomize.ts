import { Question } from '../data/types'

/**
 * Shuffle an array (Fisher-Yates algorithm)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Randomize question order
 */
export function randomizeQuestions(questions: Question[]): Question[] {
  return shuffleArray(questions)
}

/**
 * Randomize options within each question
 * IMPORTANT: After shuffling, reassign IDs as A, B, C in order
 * to maintain consistency between option position and ID
 */
export function randomizeOptions(question: Question): Question {
  const shuffledOptions = shuffleArray(question.options)

  // Reassign IDs to A, B, C based on new order
  const reorderedOptions = shuffledOptions.map((option, index) => ({
    ...option,
    id: ['A', 'B', 'C'][index] as 'A' | 'B' | 'C'
  }))

  return {
    ...question,
    options: reorderedOptions
  }
}

/**
 * Randomize both questions and options
 */
export function randomizeAll(questions: Question[]): Question[] {
  const randomizedQuestions = randomizeQuestions(questions)
  return randomizedQuestions.map(q => randomizeOptions(q))
}
