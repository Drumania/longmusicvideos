"use client";

import { useEffect, useState } from 'react';
import { app } from '@/lib/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

export function FirebaseDebug() {
  const [status, setStatus] = useState<string>('Checking...');
  const [error, setError] = useState<string>('');
  const { user } = useAuth();

  // Solo mostrar para el usuario específico
  const shouldShow = user?.email === 'martinbrumana@gmail.com';

  useEffect(() => {
    if (!shouldShow) return;

    const checkFirebase = async () => {
      try {
        const db = getFirestore(app);
        const videosCollection = collection(db, 'videos');
        const snapshot = await getDocs(videosCollection);
        
        setStatus(`Firebase conectado. Videos en DB: ${snapshot.size}`);
        setError('');
      } catch (err) {
        setStatus('Error de conexión');
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Firebase error:', err);
      }
    };

    checkFirebase();
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg text-white text-sm max-w-xs">
      <div className="font-semibold mb-2">Firebase Status:</div>
      <div className="text-green-400">{status}</div>
      {error && <div className="text-red-400 mt-2">{error}</div>}
    </div>
  );
}
