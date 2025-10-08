
import { BrandGuidelines } from "@/components/BrandGuidelines";
import { Header } from "@/components/Header";

export default function GuidelinePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <main className="p-8 flex items-center justify-center">
        <BrandGuidelines />
      </main>
    </div>
  );
}
