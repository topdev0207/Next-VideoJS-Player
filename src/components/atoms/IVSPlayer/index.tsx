/**
 * IVS Player React Component
 * Reference: https://docs.aws.amazon.com/ivs/latest/userguide/player-videojs.html
 */
import React, { useEffect } from "react";
import videojs from "video.js";
import {
  VideoJSQualityPlugin,
  VideoJSIVSTech,
  VideoJSEvents,
  TextMetadataCue,
} from "amazon-ivs-player";
import Head from "next/head";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 640px;
  height: 480px;
  margin: 15px;
`;

// 디폴트 playback url
const defaultPlaybackUrl =
  "https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8";

export interface IVSPlayerProps {
  /** IVS Playback URL */
  src?: string;
  /** quiz 메타데이터가 도달하면 이를 핸들링하는 함수 */
  handleQuizEvent?: (cue: TextMetadataCue) => void;
}

function IVSPlayer({ src, handleQuizEvent }: IVSPlayerProps) {
  useEffect(() => {
    // 로드할 source stream 을 지정합니다. Prop 으로 받은 src 로 설정하거나 존재하지 않으면 기본 url 로 설정합니다(필수 아님).
    const PLAYBACK_URL = src ?? defaultPlaybackUrl;

    // Amazon IVS 를 video.js 의 playback tech 로 설정합니다.
    window.registerIVSTech(videojs);
    // IVS 에서는 스트리밍 품질을 선택할 수 있는 플러그인을 제공해줍니다.
    // IVS 에서 제공하는 UI 플러그인을 사용하려면 이를 등록해주어야 합니다.
    window.registerIVSQualityPlugin(videojs);

    /**
     * 플레이어를 초기화하고 instantiate 합니다.
     */
    const player = videojs(
      // 플레이어에 연동될 video 태그의 id
      "amazon-ivs-videojs",
      // 플레이어 옵션
      {
        techOrder: ["AmazonIVS"], // 플레이어 인스턴스를 생성할 때, IVS 를 첫 번째 테크로 제공해주어야 합니다.
        autoplay: true,
      },
      // video.js ready 이벤트 핸들러 추가
      () => {
        // playback url 을 src 로 설정합니다. autoplay 가 옵션으로 주어진다면 바로 play 됩니다.
        console.log("IVS Player is READY!");
        player.src(PLAYBACK_URL);
      }
    ) as videojs.Player & VideoJSIVSTech & VideoJSQualityPlugin;

    // 위에서 등록한 플러그인을 enable 시켜주어야 UI 버튼들이 나타납니다.
    player.enableIVSQualityPlugin();

    /**
     * 이벤트 리스너를 추가해줍니다
     * video.js 외의 IVS Player 에서 발생하는 event 는 다음과 같이 추가하고 제거할 수 있습니다.
     */
    const events: VideoJSEvents = player.getIVSEvents();
    const ivsPlayer = player.getIVSPlayer();

    // PLAYING 이벤트 핸들러 추가
    ivsPlayer.addEventListener(events.PlayerState.PLAYING, () => {
      console.log("IVS Player is PLAYING");
    });
    // IDLE 이벤트 핸들러 추가
    ivsPlayer.addEventListener(events.PlayerState.IDLE, () => {
      console.log("IVS Player is IDLE");
    });
    // BUFFERING 이벤트 핸들러 추가
    ivsPlayer.addEventListener(events.PlayerState.BUFFERING, () => {
      console.log("IVS Player is BUFFERING");
    });
    // ENDED 이벤트 핸들러 추가
    ivsPlayer.addEventListener(events.PlayerState.ENDED, () => {
      console.log("IVS Player is ENDED");
    });

    // Timed metadata 를 수신하였을 때 이를 핸들링하는 이벤트 핸들러 추가
    ivsPlayer.addEventListener(
      events.PlayerEventType.TEXT_METADATA_CUE,
      function (cue) {
        console.log(cue);
        console.log("Timed metadata: ", cue.text);

        const metadata = JSON.parse(cue.text);
        if (metadata.type === "quiz" && handleQuizEvent) {
          handleQuizEvent(cue);
        }
      }
    );

    /**
     * 에러 핸들러를 추가해줍니다.
     */
    // video.js 에러 핸들러 추가
    player.on("error", () => {
      console.log(player.error());
    });
    // IVS 플레이어 에러 핸들러 추가
    ivsPlayer.addEventListener(events.PlayerEventType.ERROR, (payload) => {
      const { type, code, source, message } = payload;
      console.log(type, code, source, message);
    });
  }, [src]);

  return (
    <>
      <Head>
        {/** IVS 플레이어에서 제공해주는 플러그인 UI를 스타일링 하는 css */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.6.6/video-js.css"
          rel="stylesheet"
        />
      </Head>
      <Wrapper className="video-container">
        <video
          id="amazon-ivs-videojs"
          className="video-js vjs-4-3 vjs-big-play-centered"
          controls
          autoPlay
          playsInline
        ></video>
      </Wrapper>
    </>
  );
}

export default IVSPlayer;
