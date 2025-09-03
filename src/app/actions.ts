
'use server';

import { revalidatePath } from 'next/cache';
import { app } from '@/lib/firebase';
import { getFirestore, doc, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';

const db = getFirestore(app);

// Action to add a vote to a video
export async function addVote(documentId: string) {
  try {
    const videoRef = doc(db, 'videos', documentId);
    await updateDoc(videoRef, {
      votes: increment(1),
    });
    revalidatePath('/'); // Re-renders the page to show the new vote count
    return { success: true };
  } catch (error) {
    console.error('Error voting for video:', error);
    return { success: false, error: 'Failed to vote.' };
  }
}

// Action to toggle a video as a favorite
export async function toggleFavorite(documentId: string, userId: string, isFavorited: boolean) {
  try {
    const videoRef = doc(db, 'videos', documentId);
    await updateDoc(videoRef, {
      favorites: isFavorited ? arrayRemove(userId) : arrayUnion(userId),
    });
    revalidatePath('/');
    revalidatePath('/favorites'); // Also revalidate the favorites page
    return { success: true };
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return { success: false, error: 'Failed to update favorites.' };
  }
}
