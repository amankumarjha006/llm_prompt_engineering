import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 px-4 bg-red-50 border border-red-100 rounded-xl">
      <AlertTriangle className="w-10 h-10 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-red-800 mb-2">Comparison Failed</h3>
      <p className="text-red-600 text-center max-w-lg mb-6">{message}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
