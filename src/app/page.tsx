

import { BrandGuidelinesPreview } from "@/components/BrandGuidelinesPreview";
import { Header } from "@/components/Header";
import Link from "next/link";

export default async function Home() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <Link href={`/guideline/${i + 1}`} key={i}>
              <BrandGuidelinesPreview />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

