import Link from "next/link";

export default function Footer() {
  const now = new Date();
  const lastUpdated = now.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <footer className="w-full bg-gray-900 border-t h-16 items-center">
      <div className="max-w-6xl mx-auto py-2 text-center text-white">
        <p className="text-sm mb-2">
          &copy; 2025 - {now.getFullYear()} Physical Vision Group (PVG). All rights reserved.
        </p>
        <p className="text-xs text-gray-400">
          Last updated: {lastUpdated}
        </p>
      </div>
    </footer>
  );
}
