import styled, { css } from "styled-components";

const Wrapper = styled.div<Partial<AnswerProps>>`
  margin: 0 0 12px 0;
  padding: 8px 16px;

  font-size: 16px;

  border: 1px solid lightgrey;
  border-radius: 10px;

  ${({ showResult, correct }) =>
    showResult &&
    correct &&
    css`
      color: white;
      background-color: #00cc00;
      border: none;
    `}

  ${({ showResult, correct }) =>
    showResult &&
    !correct &&
    css`
      color: white;
      background-color: #ff3b3b;
      border: none;
    `}

  cursor: pointer;
`;

export interface AnswerProps {
  /** 선택지 인덱스 */
  index: number;
  /** 선택지 클릭 시 호출되는 함수 */
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** 정답 여부 */
  correct: boolean;
  /** 결과 노출 여부(결과 값) */
  showResult: string;
  children?: React.ReactNode;
}

const Answer = ({
  index,
  onClick,
  correct,
  showResult,
  children,
}: AnswerProps) => {
  return (
    <Wrapper
      onClick={onClick}
      correct={correct}
      data-index={index}
      showResult={showResult}
    >
      {children}
    </Wrapper>
  );
};

export default Answer;
