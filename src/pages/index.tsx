import IVSPlayer from "@components/atoms/IVSPlayer";
import QuizModal, { IQuiz } from "@components/molecules/QuizModal";
import useScript from "@hooks/useScript";
import { TextMetadataCue } from "amazon-ivs-player";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;

/** 퀴즈 초기 정보 */
const initialQuizInfo = {
  question: "",
  correctIndex: 0,
  answers: [],
};

/** 라이브 스트리밍 url */
const playBackUrl = process.env.NEXT_PUBLIC_PLAYBACK_URL;

export default function Home() {
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

    /** 10 초 뒤에 퀴즈를 닫는다 */
    setTimeout(() => {
      setShowQuizModal(false);
      setQuizInfo(initialQuizInfo);
    }, 10 * 1000);
  };

  // Load IVS tech
  const { loading, error } = useScript({
    src: "https://player.live-video.net/1.2.0/amazon-ivs-videojs-tech.min.js",
  });
  // Load IVS quality plugin
  const { loading: loadingPlugin, error: pluginError } = useScript({
    src: "https://player.live-video.net/1.2.0/amazon-ivs-quality-plugin.min.js",
  });

  if (loading || loadingPlugin) {
    return "loading ivs videojs tech and plugins...";
  }

  if (error || pluginError) {
    return "Error!";
  }

  return (
    <Wrapper>
      {/** IVS 플레이어 */}
      <IVSPlayer src={playBackUrl} handleQuizEvent={handleQuizEvent} />
      {/** 퀴즈 모달 */}
      {showQuizModal && <QuizModal quizInfo={quizInfo} />}
    </Wrapper>
  );
}
