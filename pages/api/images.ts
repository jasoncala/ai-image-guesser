import { Storage } from '@google-cloud/storage';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

// Google Cloud setup using service account JSON file
const storage = new Storage({
  keyFilename: path.join(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS || ''),
});

const bucketName = 'ai-image-guesser-images';  // Replace with your actual bucket name

// Helper function to get images from the folder (either 'ai' or 'real')
async function getImagesFromFolder(folder: 'ai' | 'real') {
  try {
    console.log(`Fetching images from folder: ${folder}`);
    const [files] = await storage.bucket(bucketName).getFiles({
      prefix: `${folder}/`,  // Fetch images from 'ai/' or 'real/' folder
    });

    if (!files || files.length === 0) {
      console.log(`No images found in folder: ${folder}`);
      throw new Error('No images found');
    }

    console.log(`Found ${files.length} files in folder: ${folder}`);

    // Extract URLs of images from the folder
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
    // Randomly select either 'ai' or 'real'
    const isAI = Math.random() < 0.5 ? 'ai' : 'real';
    console.log(`Selected folder: ${isAI}`);

    // Fetch images from the selected folder
    const imageUrls = await getImagesFromFolder(isAI);

    if (imageUrls.length === 0) {
      return res.status(404).json({ message: 'No images found in the folder' });
    }

    // Select a random image from the fetched URLs
    const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    console.log(`Selected random image: ${randomImage}`);

    // Return the selected image and its type (either 'ai' or 'real')
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
