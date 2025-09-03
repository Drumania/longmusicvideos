
import { UserCircle, Search } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="text-2xl font-bold">Lofi Videos</div>
      <div className="flex items-center gap-4">
        <Search />
        <UserCircle />
      </div>
    </header>
  );
}
