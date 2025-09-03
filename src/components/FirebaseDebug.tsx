"use client";

import { useEffect, useState } from 'react';
import { app } from '@/lib/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export function FirebaseDebug() {
  const [status, setStatus] = useState<string>('Checking...');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<string>('');
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

  const fetchMoreVideos = async () => {
    setIsLoading(true);
    setLastResult('');
    setError('');
    
    try {
      const response = await fetch('/api/cron/youtube');
      const result = await response.json();
      
      if (response.ok) {
        setLastResult(`✅ ${result.inserted} videos insertados, ${result.scanned} escaneados`);
        
        // Actualizar el status después de agregar videos
        const db = getFirestore(app);
        const videosCollection = collection(db, 'videos');
        const snapshot = await getDocs(videosCollection);
        setStatus(`Firebase conectado. Videos en DB: ${snapshot.size}`);
        
        // Si se insertaron videos, actualizar la página después de un breve delay
        if (result.inserted > 0) {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } else {
        setError(`Error: ${result.error || 'Error desconocido'}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg text-white text-sm max-w-xs">
      <div className="font-semibold mb-2">Firebase Status:</div>
      <div className="text-green-400 mb-3">{status}</div>
      
      <Button 
        onClick={fetchMoreVideos}
        disabled={isLoading}
        className="w-full mb-3 bg-cyan-600 hover:bg-cyan-700 text-white"
        size="sm"
      >
        {isLoading ? 'Buscando...' : 'Traer más videos'}
      </Button>
      
      {lastResult && (
        <div className="text-green-400 text-xs mb-2">{lastResult}</div>
      )}
      
      {error && <div className="text-red-400 text-xs">{error}</div>}
    </div>
  );
}
