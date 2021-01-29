import { IQuiz } from "@components/molecules/QuizModal";
import { TextMetadataCue } from "amazon-ivs-player";
import { useState } from "react";

/** 퀴즈 초기 정보 */
const initialQuizInfo = {
  question: "",
  correctIndex: 0,
  answers: [],
};

export default function useQuiz() {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizInfo, setQuizInfo] = useState<IQuiz>(initialQuizInfo);
  /**
   * timed metadata로 들어온게 퀴즈라면 퀴즈 모달을 띄워준다
   */
  const handleQuizEvent = (cue: TextMetadataCue) => {
    const { question, answers, correctIndex } = JSON.parse(cue.text);
    // 퀴즈 모달을 띄운다
    setShowQuizModal(true);
    setQuizInfo({
      question,
      answers,
      correctIndex,
    });
  };

  const handleClickAnswer = () => {
    /** 5 초 뒤에 퀴즈를 닫는다 */
    setTimeout(() => {
      setShowQuizModal(false);
      setQuizInfo(initialQuizInfo);
    }, 5 * 1000);
  };

  return {
    showQuizModal,
    quizInfo,

    handleQuizEvent,
    handleClickAnswer,
  };
}
