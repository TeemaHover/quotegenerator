import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = JSON.stringify({
        q: 'apple inc',
        gl: 'mn',
      });

      const config = {
        method: 'post',
        url: 'https://google.serper.dev/search',
        headers: {
          'X-API-KEY': '91a8429ee8d3f4aabac525321c36736819776cd7',
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const response = await axios(config);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while making the request' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}


// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

// import { OpenAI } from "openai";
// type ResponseData = {
//   url: string | undefined;
// };
// interface GenerateRequest extends NextApiRequest {
//   body: {
//     prompt: string;
//     n: number;
//     size: string;
//   };
// }

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEYS,
// });

// export  async  function GET(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   const promptString = req.body.prompt;

//   if (!promptString || undefined) {
//     return new Response("you need a prompt", { status: 400 });
//   }
//   const aiResponse = await openai.images.generate({
//     prompt: `${promptString}`,
//     n: 1,
//     size: "512x512",
//   });
//   const imageUrl = aiResponse.data[0].url;
//   res.status(200).json({ url: imageUrl });
// }
