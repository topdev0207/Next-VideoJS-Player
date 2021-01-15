import { useState } from "react";
import Answer from "@components/atoms/Answer";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 400px;
  padding: 24px 40px;

  border: 1px solid lightgrey;
  border-radius: 16px;
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.1);
`;
const Title = styled.h1`
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: bold;
`;
const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

/** 퀴즈 인터페이스 */
export interface IQuiz {
  /** 질문 제목 */
  question: string;
  /** 정답 인덱스 */
  correctIndex: number;
  /** 선택지 */
  answers: string[];
}

export interface QuizModalProps {
  quizInfo: IQuiz;
}

const QuizModal = ({
  quizInfo: { question, correctIndex, answers },
}: QuizModalProps) => {
  const [showResult, setShowResult] = useState("");

  /**
   * 선택지를 클릭하면 호출되는 함수
   */
  const handleClickAnswer = (e: React.MouseEvent<HTMLDivElement>) => {
    // 이미 정답이 보여지고 있다면 return;
    if (showResult) {
      return;
    }

    const { index } = e.currentTarget.dataset;
    if (!index || isNaN(Number(index))) {
      return;
    }

    if (Number(index) === correctIndex) {
      setShowResult("정답입니다!🎉");
    } else {
      setShowResult("틀렸습니다😅..");
    }
  };

  return (
    <Wrapper>
      <Title>Q. {question}</Title>
      <AnswerContainer>
        {answers.map((ans, index) => (
          <Answer
            key={index}
            index={index}
            onClick={handleClickAnswer}
            correct={index === correctIndex}
            showResult={showResult}
          >
            {ans}
          </Answer>
        ))}
      </AnswerContainer>
      {showResult}
    </Wrapper>
  );
};

export default QuizModal;
