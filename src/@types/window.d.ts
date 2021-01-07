declare global {
  interface Window {
    registerIVSTech: (videojs: any) => void;
    registerIVSQualityPlugin: (videojs: any) => void;
  }
}

export default {};
