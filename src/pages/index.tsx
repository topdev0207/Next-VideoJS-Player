import IVSPlayer from "@components/IVSPlayer";
import useScript from "@hooks/useScript";

export default function Home() {
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

  const playBackUrl = process.env.NEXT_PUBLIC_PLAYBACK_URL;

  return <IVSPlayer src={playBackUrl} />;
}
