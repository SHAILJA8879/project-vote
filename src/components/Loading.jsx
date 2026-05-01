import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center p-12 min-h-[200px]">
      <Loader2 className="w-8 h-8 text-teal-600 dark:text-teal-400 animate-spin" />
    </div>
  );
}
