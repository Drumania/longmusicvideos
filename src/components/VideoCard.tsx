
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle, ThumbsUp, Youtube } from 'lucide-react';

export interface Video {
    id: string;
    title: string;
    channel: string;
    thumbnail: string;
}

export function VideoCard({ video }: { video: Video }) {
  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
        <div className="relative">
            <img src={video.thumbnail} alt={video.title} className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <Button variant="ghost" size="icon" className="text-white hover:text-cyan-400 transition-colors">
                    <PlayCircle className="h-12 w-12" />
                </Button>
            </div>
        </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-white truncate">{video.title}</CardTitle>
        <p className="text-sm text-gray-400">{video.channel}</p>
      </CardHeader>
      <CardFooter className="p-4 flex justify-between items-center bg-gray-800">
        <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-rose-500 transition-colors">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-green-500 transition-colors">
              <ThumbsUp className="h-5 w-5" />
            </Button>
        </div>
        <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
                <Youtube className="h-5 w-5 mr-2" />
                YouTube
            </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
