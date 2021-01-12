import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const secretKey = (process.env.PRIVATE_PLAYBACK_KEY as string).replace(
    /\\n/g,
    "\n"
  );
  const ivsPlaybackToken = jwt.sign(
    {
      "aws:channel-arn": process.env.NEXT_PUBLIC_CHANNEL_ARN,
    },
    secretKey,
    {
      algorithm: "ES384",
      expiresIn: "7d",
    }
  );

  return res.status(200).json({ playbackToken: ivsPlaybackToken });
}
