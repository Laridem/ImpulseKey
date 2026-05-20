import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Question, Result, UserAnswer, DimensionScores } from '../data/types';
import { QUESTIONS } from '../data/questions';
import { RESULTS } from '../data/results';
import { calculateResult, calculateScores, applyRoleWeights } from '../utils/scoring';
import { randomizeQuestions, randomizeOptions } from '../utils/randomize';
import { transformResult } from '../utils/resultTransform';
import { transformQuestions } from '../utils/questionTransform';

// Context State Interface
interface TestState {
  // Questions
  questions: Question[];
  currentQuestionIndex: number;

  // Answers
  answers: UserAnswer[];

  // Role Selection
  selectedRole: string | null;
  setSelectedRole: (roleId: string) => void;

  // Result
  resultKey: string | null;
  result: Result | null;
  dimensionScores: DimensionScores | null;

  // Actions
  startTest: () => void;
  answerQuestion: (questionId: string, selectedOption: 'A' | 'B' | 'C') => void;
  goToPreviousQuestion: () => void;
  submitTest: () => void;
  resetTest: () => void;
  goToResult: (key: string) => void;
}

// Create Context
const TestContext = createContext<TestState | undefined>(undefined);

// Provider Props
interface TestProviderProps {
  children: ReactNode;
}

// Provider Component
export const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [resultKey, setResultKey] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [dimensionScores, setDimensionScores] = useState<DimensionScores | null>(null);

  // Start a new test
  const startTest = () => {
    // Randomize questions and their options
    const rawQuestions = transformQuestions(QUESTIONS);
    const randomizedQuestions = randomizeQuestions(rawQuestions);
    const questionsWithRandomizedOptions = randomizedQuestions.map(q =>
      randomizeOptions(q)
    );

    setQuestions(questionsWithRandomizedOptions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResultKey(null);
    setResult(null);
  };

  // Answer a question
  const answerQuestion = (questionId: string, selectedOption: 'A' | 'B' | 'C') => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const selectedAnswer = question.options.find(opt => opt.id === selectedOption);
    if (!selectedAnswer) return;

    // Save answer
    const newAnswer: UserAnswer = {
      questionId,
      selectedOption,
      dimension: question.dimension,
      score: selectedAnswer.score || selectedAnswer.scores
    };

    // Check if this question was already answered
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);

    let newAnswers: UserAnswer[];
    if (existingAnswerIndex !== -1) {
      // Replace existing answer (user changed their mind)
      newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = newAnswer;
    } else {
      // New answer
      newAnswers = [...answers, newAnswer];
    }

    setAnswers(newAnswers);

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 300); // 300ms delay for visual feedback
  };

  // Go to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      // Just go back - keep all answers intact so user can change them
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Submit test and calculate result
  const submitTest = () => {
    if (answers.length === questions.length) {
      // Calculate base scores from answers
      let scores = calculateScores(answers);

      // Apply role weights if a role was selected
      if (selectedRole) {
        scores = applyRoleWeights(scores, selectedRole);
      }

      // Calculate final result key
      const calculatedResultKey = calculateResult(answers);
      const resultType = RESULTS[calculatedResultKey];
      const calculatedResult = transformResult(resultType);

      setDimensionScores(scores);
      setResultKey(calculatedResultKey);
      setResult(calculatedResult);
    }
  };

  // Reset test to initial state
  const resetTest = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedRole(null);
    setResultKey(null);
    setResult(null);
    setDimensionScores(null);
  };

  // Navigate to a specific result (for direct URL access)
  const goToResult = (key: string) => {
    const resultType = RESULTS[key];
    if (resultType) {
      const targetResult = transformResult(resultType);
      setResultKey(key);
      setResult(targetResult);
    }
  };

  const value: TestState = {
    questions,
    currentQuestionIndex,
    answers,
    selectedRole,
    setSelectedRole,
    resultKey,
    result,
    dimensionScores,
    startTest,
    answerQuestion,
    goToPreviousQuestion,
    submitTest,
    resetTest,
    goToResult
  };

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

// Custom Hook
export const useTest = (): TestState => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};
