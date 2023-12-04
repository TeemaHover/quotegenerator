
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const query = req.body.query;

    const apiKey = 'AIzaSyCFWlQhHuAffit2Eh9fWV0KcPAEMZvC0Xs'; // Replace with your Google API key
    const cx = 'f2eeec22bbf844ae2'; // Replace with your Custom Search Engine ID

    const googleApiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}&searchType=image`;

    try {
      const response = await fetch(googleApiUrl);
      if (response.ok) {
        const data = await response.json();
        const firstImage = data.items[0];

        if (firstImage) {
          // Return the first image to the front end
          res.status(200).json(firstImage);
        } else {
          res.status(404).json({ error: 'No images found' });
        }
      } else {
        console.error('Error fetching images');
        res.status(500).json({ error: 'An error occurred while fetching images.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching images.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
