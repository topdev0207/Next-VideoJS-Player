/**
 * IVS Player React Component
 * Reference: https://docs.aws.amazon.com/ivs/latest/userguide/player-videojs.html
 */
import React, { useEffect } from "react";
import videojs from "video.js";
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
}

function IVSPlayer({ src }: IVSPlayerProps) {
  useEffect(() => {
    // 로드할 source stream 을 지정합니다. Prop 으로 받은 src 로 설정하거나 존재하지 않으면 기본 url 로 설정합니다(필수 아님).
    const PLAYBACK_URL = src ?? defaultPlaybackUrl;

    // Amazon IVS 를 video.js 의 playback tech 로 설정합니다.
    window.registerIVSTech(videojs);
    // IVS 에서는 스트리밍 품질을 선택할 수 있는 플러그인을 제공해줍니다.
    // IVS 에서 제공하는 UI 플러그인을 사용하려면 이를 등록해주어야 합니다.
    window.registerIVSQualityPlugin(videojs);

    // 플레이어를 초기화하고 instantiate 합니다.
    const player = videojs(
      // 플레이어에 연동될 video 태그의 id
      "amazon-ivs-videojs",
      // 플레이어 옵션
      {
        techOrder: ["AmazonIVS"], // 플레이어 인스턴스를 생성할 때, IVS 를 첫 번째 테크로 제공해주어야 합니다.
        autoplay: true,
      },
      // 플레이어가 ready 가 되면 호출되는 콜백 함수
      () => {
        // playback url 을 src 로 설정합니다. autoplay 가 옵션으로 주어진다면 바로 play 됩니다.
        console.log("Player is ready to use!");
        player.src(PLAYBACK_URL);
      }
    );

    // 위에서 등록한 플러그인을 enable 시켜주어야 UI 버튼들이 나타납니다.
    // type definition 을 적용하려면 npm 패키지를 설치하거나 custom 하게 정의해주어야 합니다. 여기서는 무시합니다.
    // @ts-ignore
    player.enableIVSQualityPlugin();
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
