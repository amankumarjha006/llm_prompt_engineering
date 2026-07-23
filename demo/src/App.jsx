import { useState } from 'react';
import Header from './components/Header';
import ComparisonForm from './components/ComparisonForm';
import ComparisonResult from './components/ComparisonResult';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import { fetchComparison } from './services/comparisonApi';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleCompare = async (productA, productB) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchComparison(productA, productB);
      if (data && data.comparison) {
        setResult(data.comparison);
      } else {
        throw new Error('Received unexpected data format from the server.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
      // Smooth scroll slightly down after submit is handled
      setTimeout(() => {
        window.scrollTo({
          top: 300,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pb-20">
      <Header />
      
      <main className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Compare products side by side
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter two products and get a structured AI-powered comparison of specifications, strengths, weaknesses, performance, value, and recommendations.
          </p>
        </div>

        <ComparisonForm onCompare={handleCompare} isLoading={loading} />

        <div className="mt-16">
          {loading && <LoadingState />}
          {error && <ErrorState message={error} onRetry={() => setError(null)} />}
          {result && !loading && !error && (
            <ComparisonResult data={result} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
