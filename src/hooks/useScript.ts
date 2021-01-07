import { useState, useEffect } from "react";
import { isServer } from "@utils/environment";

export interface ScriptProps {
  /**
   * 불러오고자 하는 script url
   */
  src: HTMLScriptElement["src"] | null;
  /**
   * 기존에 추가된 스크립트가 있는지 확인하는 여부. true 면 한 번만 로드한다
   */
  checkForExisting?: boolean;
  /**
   * 스크립트를 conditional 하게 로드할 수 있도록 해주는 플래그
   * pending 인 상태면 스크립트를 로드하지 않는다
   */
  pending?: boolean;
  /**
   * script 태그의 나머지 attribute
   */
  [attribute: string]: any;
}

type ErrorState = ErrorEvent | null;

export default function useScript({
  src,
  checkForExisting = false,
  pending,
  ...attributes
}: ScriptProps) {
  const [loading, setLoading] = useState(Boolean(src));
  const [error, setError] = useState<ErrorState>(null);

  useEffect(() => {
    // 서버사이드 이거나 src 가 없다면 return
    if (isServer || !src) {
      return;
    }

    // pending 이 true 라면 return;
    if (pending) {
      return;
    }

    // 중복 체크
    if (checkForExisting) {
      const existing = document.querySelectorAll(`script[src="${src}"]`);
      if (existing.length > 0) {
        setLoading(false);
        return;
      }
    }

    // script 태그를 생성하고 src 와 기타 attribute 를 추가한다
    const scriptEl = document.createElement("script");

    scriptEl.setAttribute("src", src);

    Object.keys(attributes).forEach((key) => {
      scriptEl.setAttribute(key, attributes[key]);
    });

    // load, error 이벤트 핸들러 추가
    const handleLoad = () => {
      setLoading(false);
    };

    const handleError = (error: ErrorEvent) => {
      console.error(error);
      setError(error);
    };

    scriptEl.addEventListener("load", handleLoad);
    scriptEl.addEventListener("error", handleError);

    // 생성한 script tag 를 document 에 attach 한다
    document.body.appendChild(scriptEl);

    return () => {
      scriptEl.removeEventListener("load", handleLoad);
      scriptEl.removeEventListener("error", handleError);
      scriptEl.remove();
    };
    // src 가 변경될때만 다시 실행
  }, [src, pending]);

  return { loading, error };
}
