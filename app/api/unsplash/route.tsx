import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'GET') {
    const query = req.query.query;
    const accessKey = 'IY551ZQ33t1tc4sxI16PTTefWVZEBIbIapWCOkmMmi0'; // Replace with your Unsplash access key
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

    try {
      const response = await axios.get(apiUrl);
      const images = response.data.results;
      res.status(200).json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching images from Unsplash.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}