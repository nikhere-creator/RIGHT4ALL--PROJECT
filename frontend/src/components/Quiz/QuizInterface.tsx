import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, RotateCcw, Award } from 'lucide-react';

interface Question {
  id: number;
  legalId: number | null;
  type: string;
  question: string;
  options: Array<{
    letter: string;
    text: string;
    correct: boolean;
  }>;
  correctAnswer: string;
  explanations: Array<{
    option: string;
    text: string;
  }>;
}

interface Topic {
  id: number;
  name: string;
  questions: Question[];
}

interface QuizInterfaceProps {
  topic: Topic | null;
  allTopics: Topic[];
  isAllTopics: boolean;
  languageName: string;
  onBack: () => void;
  onRestart: () => void;
}

export default function QuizInterface({ 
  topic, 
  allTopics, 
  isAllTopics, 
  languageName, 
  onBack, 
  onRestart 
}: QuizInterfaceProps) {
  const questions = useMemo(() => {
    if (isAllTopics) {
      // Shuffle questions from all topics
      const allQuestions = allTopics.flatMap(t => t.questions);
      return allQuestions.sort(() => Math.random() - 0.5);
    }
    return topic?.questions || [];
  }, [topic, allTopics, isAllTopics]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No questions available</h2>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (optionLetter: string) => {
    if (showFeedback) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionLetter
    }));
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowFeedback(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowFeedback(false);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setQuizCompleted(false);
  };

  const getExplanation = (optionLetter: string) => {
    return currentQuestion.explanations.find(exp => exp.option === optionLetter)?.text || '';
  };

  // Results Screen
  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen p-6">
        <div className="container-max py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h1>
                <div className="text-6xl font-extrabold text-white mb-2">{percentage}%</div>
                <p className="text-white/70 text-lg">
                  You scored {score} out of {questions.length} questions correctly
                </p>
              </div>

              {/* Question Review */}
              <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  const correctOption = question.options.find(opt => opt.letter === question.correctAnswer);
                  const userOption = question.options.find(opt => opt.letter === userAnswer);
                  
                  return (
                    <div key={question.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {isCorrect ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : (
                            <X className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2">
                            {index + 1}. {question.question}
                          </h3>
                          <p className="text-white/70 text-sm mb-1">
                            Your answer: <span className="font-medium">{userOption?.text || 'No answer'}</span>
                          </p>
                          {!isCorrect && (
                            <p className="text-green-400 text-sm">
                              Correct answer: <span className="font-medium">{correctOption?.text}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={restartQuiz}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
                <button
                  onClick={onRestart}
                  className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all"
                >
                  New Category
                </button>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-all"
                >
                  Back to Topics
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Quiz Interface
  return (
    <div className="min-h-screen p-6">
      <div className="container-max py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isAllTopics ? 'Complete Rights Quiz' : topic?.name}
                </h2>
                <p className="text-white/70 text-sm">
                  {languageName} • Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/10 rounded-full mb-8">
            <div 
              className="h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-slate-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-8"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                {currentQuestion.type === 'true_false' && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                    True/False
                  </span>
                )}
                {currentQuestion.type === 'multiple_choice' && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                    Multiple Choice
                  </span>
                )}
                {currentQuestion.legalId && (
                  <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs font-medium">
                    Legal ID: {currentQuestion.legalId}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswer === option.letter;
                const isCorrect = option.correct;
                const showCorrectness = showFeedback;
                
                let className = 'p-4 rounded-xl border cursor-pointer transition-all ';
                
                if (showCorrectness) {
                  if (isCorrect) {
                    className += 'border-green-500 bg-green-500/10 text-green-300';
                  } else if (isSelected && !isCorrect) {
                    className += 'border-red-500 bg-red-500/10 text-red-300';
                  } else {
                    className += 'border-white/10 bg-white/5 text-white/60';
                  }
                } else {
                  if (isSelected) {
                    className += 'border-rose-400 bg-rose-500/10 text-white';
                  } else {
                    className += 'border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20';
                  }
                }
                
                return (
                  <div
                    key={option.letter}
                    className={className}
                    onClick={() => handleAnswerSelect(option.letter)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">
                        {option.letter}
                      </span>
                      <span className="flex-1">{option.text}</span>
                      {showCorrectness && isCorrect && (
                        <Check className="w-5 h-5 text-green-400" />
                      )}
                      {showCorrectness && isSelected && !isCorrect && (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    
                    {showFeedback && isSelected && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-sm opacity-90">
                          {getExplanation(option.letter)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex gap-3">
              {!showFeedback ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!selectedAnswer}
                  className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all font-medium"
                >
                  {isLastQuestion ? 'View Results' : 'Next Question'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}