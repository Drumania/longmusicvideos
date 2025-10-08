
import { Header } from "@/components/Header";

export default async function TopVotedPage() {

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-8">
        <h1 className="text-3xl font-bold">Top Voted</h1>
      </main>
    </div>
  );
}
