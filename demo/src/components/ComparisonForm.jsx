import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ComparisonForm({ onCompare, isLoading }) {
  const [productA, setProductA] = useState('');
  const [productB, setProductB] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const a = productA.trim();
    const b = productB.trim();
    
    if (!a || !b) {
      setError('Both product fields are required.');
      return;
    }
    
    if (a.toLowerCase() === b.toLowerCase()) {
      setError('Please enter two different products to compare.');
      return;
    }

    setError('');
    onCompare(a, b);
  };

  return (
    <div className="glass-card p-6 sm:p-8 max-w-4xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-full flex-1">
            <label htmlFor="productA" className="block text-sm font-medium text-gray-700 mb-2">
              Product A
            </label>
            <input
              id="productA"
              type="text"
              value={productA}
              onChange={(e) => {
                setProductA(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. iPhone 15 Pro"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-gray-900"
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex items-center justify-center md:pt-6">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-sm">
              VS
            </div>
          </div>

          <div className="w-full flex-1">
            <label htmlFor="productB" className="block text-sm font-medium text-gray-700 mb-2">
              Product B
            </label>
            <input
              id="productB"
              type="text"
              value={productB}
              onChange={(e) => {
                setProductB(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Samsung Galaxy S24"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow text-gray-900"
              disabled={isLoading}
              required
            />
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <div className="flex justify-center mt-2">
          <button
            type="submit"
            disabled={isLoading || !productA.trim() || !productB.trim()}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors shadow-sm"
          >
            {isLoading ? 'Comparing...' : 'Compare Products'}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </form>
    </div>
  );
}
