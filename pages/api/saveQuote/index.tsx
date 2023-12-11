// pages/api/saveQuote.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../app/components/utils/mongo';
import QuoteModel from '../../../app/components/models/QuoteModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await connectToDatabase();

  const { content, author, image, tags } = req.body;

  try {
    let newQuote = new QuoteModel({ content, author, image, tags });
    let savedQuote = await newQuote.save();
    return res.status(201).json(savedQuote);
  } catch (error) {
    console.error('Error saving quote to MongoDB:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
