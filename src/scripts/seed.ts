
// src/scripts/seed.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
    throw new Error("Firebase project ID is not set in .env.local. Please make sure the environment variables are correctly set.");
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const videos = [
  {
    id: "jfKfPfyJRdk",
    title: "lofi hip hop radio 📚 - beats to relax/study to",
    channel: "Lofi Girl",
    thumbnail: "https://i.ytimg.com/vi/jfKfPfyJRdk/hq720.jpg",
    votes: 0,
    favorites: [],
  },
  {
    id: "rUxyKA_-grg",
    title: "1 A.M Study Session 📚 - [lofi hip hop/chill beats]",
    channel: "Lofi Girl",
    thumbnail: "https://i.ytimg.com/vi/rUxyKA_-grg/hq720.jpg",
    votes: 0,
    favorites: [],
  },
  {
    id: "-5KAN9_CzSA",
    title: "coffee shop radio // 24/7 lofi hip-hop beats",
    channel: "STEEZYASFUCK",
    thumbnail: "https://i.ytimg.com/vi/-5KAN9_CzSA/hq720.jpg",
    votes: 0,
    favorites: [],
  },
  {
    id: "DWcJFNfaw9c",
    title: "Lofi Hip Hop Radio 24/7 🎧 Chill Gaming / Study Beats",
    channel: "Chillhop Music",
    thumbnail: "https://i.ytimg.com/vi/DWcJFNfaw9c/hq720.jpg",
    votes: 0,
    favorites: [],
  },
];

async function seedDatabase() {
  try {
    console.log(`Seeding database for project: ${firebaseConfig.projectId}...`);
    const videosCollection = collection(db, "videos");
    for (const video of videos) {
      // Check if a video with the same ID already exists
      // Note: This is a simple check. For large datasets, a more efficient method would be needed.
      const existing = await collection(db, 'videos').where('id', '==', video.id).get();
      if (existing.empty) {
          await addDoc(videosCollection, video);
          console.log(`Added video: ${video.title}`);
      } else {
          console.log(`Skipped existing video: ${video.title}`);
      }
    }
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
