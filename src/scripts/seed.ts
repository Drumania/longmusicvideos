// src/scripts/seed.ts
import { adminDb } from '../lib/firebase-admin';
import fs from 'fs';
import path from 'path';

// Function to extract YouTube video ID from URL
function getYouTubeID(url: string): string | null {
  const arr = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return (arr[2] !== undefined) ? arr[2].split(/[^0-9a-z_\-]/i)[0] : arr[0];
}

async function seedDatabase() {
  try {
    console.log('Starting to seed database...');

    // Read and parse the videos.json file
    const jsonPath = path.resolve(process.cwd(), 'videos.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const videos: Array<{ title: string; description: string; url: string; channel?: string; }> = JSON.parse(jsonData);

    console.log(`Found ${videos.length} videos in videos.json.`);

    const videosCollection = adminDb.collection('videos');

    for (const video of videos) {
      const videoId = getYouTubeID(video.url);

      if (!videoId) {
        console.warn(`Could not extract video ID from URL: ${video.url}. Skipping.`);
        continue;
      }

      // Check if a video with the same ID already exists
      const existing = await videosCollection.where('id', '==', videoId).get();

      if (existing.empty) {
        const newVideo = {
          id: videoId,
          title: video.title,
          description: video.description,
          channel: video.channel || 'N/A', // Use channel from JSON or default
          url: video.url,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/hq720.jpg`,
          votes: Math.floor(Math.random() * 1000), // Initialize with random votes
          favorites: [],
        };
        await videosCollection.add(newVideo);
        console.log(`Added video: ${video.title}`);
      } else {
        console.log(`Skipped existing video: ${video.title}`);
      }
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit with error code if something fails
  }
}

seedDatabase().then(() => {
    process.exit(0);
}).catch(() => {
    process.exit(1);
});