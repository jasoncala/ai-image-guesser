import { Storage } from '@google-cloud/storage';
import type { NextApiRequest, NextApiResponse } from 'next';

// Google Cloud setup using environment variables
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),  // Replace escaped newlines with actual newlines
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  },
});

const bucketName = 'ai-image-guesser-images'; 

async function getImagesFromFolder(folder: 'ai' | 'real') {
  try {
    console.log(`Fetching images from folder: ${folder}`);
    const [files] = await storage.bucket(bucketName).getFiles({
      prefix: `${folder}/`,
    });

    if (!files || files.length === 0) {
      console.log(`No images found in folder: ${folder}`);
      throw new Error('No images found');
    }

    const imageUrls = files.map(file => `https://storage.googleapis.com/${bucketName}/${file.name}`);
    return imageUrls;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching files from Google Cloud: ${error.message}`);
    } else {
      console.error('Unknown error occurred');
    }
    throw new Error('Failed to fetch images');
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const isAI = Math.random() < 0.5 ? 'ai' : 'real';
    console.log(`Selected folder: ${isAI}`);

    const imageUrls = await getImagesFromFolder(isAI);

    if (imageUrls.length === 0) {
      return res.status(404).json({ message: 'No images found in the folder' });
    }

    const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    console.log(`Selected random image: ${randomImage}`);

    res.status(200).json({ url: randomImage, type: isAI });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error handling the request:', error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error('Unknown error occurred during request handling');
      res.status(500).json({ message: 'Failed to fetch images' });
    }
  }
}
