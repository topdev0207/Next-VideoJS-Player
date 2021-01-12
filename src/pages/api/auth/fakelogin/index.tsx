import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import fs from "fs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const secretKey = fs.readFileSync("private-key.pem", "utf8");
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
