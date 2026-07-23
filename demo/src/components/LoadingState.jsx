import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-24 glass-card">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-6" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Comparing products...</h3>
      <p className="text-gray-500 text-center max-w-md">
        Analyzing specifications, performance, value, and use cases. This may take a few seconds.
      </p>
    </div>
  );
}
