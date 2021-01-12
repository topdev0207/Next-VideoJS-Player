import IVSPlayer from "@components/atoms/IVSPlayer";
import QuizModal from "@components/molecules/QuizModal";
import useQuiz from "@hooks/useQuiz";
import useScript from "@hooks/useScript";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`;

/** 라이브 스트리밍 url */
const playBackUrl = undefined; /** process.env.NEXT_PUBLIC_PLAYBACK_URL; */

export default function Home() {
  const { showQuizModal, quizInfo, handleQuizEvent } = useQuiz();

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
