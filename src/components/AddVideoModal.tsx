"use client";

import { useState } from 'react';
import { Modal } from './ui/modal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Loader2, Youtube } from 'lucide-react';
import { addVideo } from '@/app/actions';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddVideoModal({ isOpen, onClose }: AddVideoModalProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState<{
    title: string;
    description: string;
    videoId: string;
    thumbnail: string;
    channel: string;
  } | null>(null);

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchVideoData = async (videoId: string) => {
    try {
      // Primero intentar con la API oficial de YouTube
      const response = await fetch(`/api/youtube/${videoId}`);
      const data = await response.json();
      
      if (response.ok) {
        return data;
      }
      
      // Si falla, usar método alternativo
      console.log('API principal falló, usando método alternativo...');
      const fallbackResponse = await fetch(`/api/youtube-fallback/${videoId}`);
      const fallbackData = await fallbackResponse.json();
      
      if (!fallbackResponse.ok) {
        throw new Error(fallbackData.error || 'Error al obtener datos del video');
      }
      
      return fallbackData;
    } catch (error) {
      console.error('Error fetching video data:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Por favor ingresa una URL de YouTube');
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('URL de YouTube no válida');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await fetchVideoData(videoId);
      setVideoData(data);
    } catch (error) {
      setError('Error al obtener información del video');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!videoData) return;

    setIsLoading(true);
    try {
      const result = await addVideo(videoData);
      if (result.success) {
        setUrl('');
        setVideoData(null);
        setError('');
        onClose();
      } else {
        setError(result.error || 'Error al guardar el video');
      }
    } catch (error) {
      console.error('Error saving video:', error);
      setError('Error al guardar el video');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUrl('');
    setVideoData(null);
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Agregar Video">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="url" className="text-white">URL de YouTube</Label>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="bg-gray-700 border-gray-600 text-white"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm">{error}</div>
        )}

        {!videoData ? (
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Obteniendo información...
              </>
            ) : (
              <>
                <Youtube className="h-4 w-4 mr-2" />
                Obtener Información
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <img
                src={videoData.thumbnail}
                alt={videoData.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-white font-semibold mb-2">{videoData.title}</h3>
              <p className="text-gray-300 text-sm mb-2">Canal: {videoData.channel}</p>
              <p className="text-gray-400 text-sm">{videoData.description}</p>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Guardar Video'
                )}
              </Button>
              <Button
                type="button"
                onClick={() => setVideoData(null)}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
}
