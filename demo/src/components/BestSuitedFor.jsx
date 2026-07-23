import { Target } from 'lucide-react';

export default function BestSuitedFor({ bestSuitedFor, nameA, nameB }) {
  if (!bestSuitedFor || (!bestSuitedFor.productA?.length && !bestSuitedFor.productB?.length)) {
    return null;
  }

  return (
    <section>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Best Suited For</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="glass-card p-6">
          <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-500" />
            {nameA}
          </h4>
          <ul className="space-y-3">
            {bestSuitedFor.productA.map((useCase, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-6">
          <h4 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            {nameB}
          </h4>
          <ul className="space-y-3">
            {bestSuitedFor.productB.map((useCase, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></span>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
