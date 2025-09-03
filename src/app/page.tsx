
import { Header } from "@/components/Header";
import { VideoCard, Video } from "@/components/VideoCard";

const mockVideos: Video[] = [
  {
    id: "jfKfPfyJRdk",
    thumbnail: "https://i.ytimg.com/vi/jfKfPfyJRdk/hq720.jpg",
    title: "lofi hip hop radio 📚 - beats to relax/study to",
    channel: "Lofi Girl",
  },
  {
    id: "rUxyKA_-grg",
    thumbnail: "https://i.ytimg.com/vi/rUxyKA_-grg/hq720.jpg",
    title: "1 A.M Study Session 📚 - [lofi hip hop/chill beats]",
    channel: "Lofi Girl",
  },
    {
    id: "-5KAN9_CzSA",
    thumbnail: "https://i.ytimg.com/vi/-5KAN9_CzSA/hq720.jpg",
    title: "coffee shop radio // 24/7 lofi hip-hop beats",
    channel: "STEEZYASFUCK",
  },
  {
    id: "DWcJFNfaw9c",
    thumbnail: "https://i.ytimg.com/vi/DWcJFNfaw9c/hq720.jpg",
    title: "Lofi Hip Hop Radio 24/7 🎧 Chill Gaming / Study Beats",
    channel: "Chillhop Music",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {mockVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </main>
    </div>
  );
}
