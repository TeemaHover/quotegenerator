// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { OpenAI } from "openai";
type ResponseData = {
  url: string | undefined;
};
interface GenerateRequest extends NextApiRequest {
  body: {
    prompt: string;
    n: number;
    size: string;
  };
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEYS,
});

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const promptString = req.body.prompt;

  if (!promptString || undefined) {
    return new Response("you need a prompt", { status: 400 });
  }
  const aiResponse = await openai.images.generate({
    prompt: `${promptString}`,
    n: 1,
    size: "512x512",
  });
  const imageUrl = aiResponse.data[0].url;
  res.status(200).json({ url: imageUrl });
}
