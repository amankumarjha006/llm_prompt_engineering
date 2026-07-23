import { Trophy, Info } from 'lucide-react';

export default function FinalRecommendation({ recommendation }) {
  if (!recommendation) return null;

  const { overallWinner, winnerName, summary, chooseProductAIf, chooseProductBIf, confidence, confidenceReason } = recommendation;

  let winnerColor = 'bg-gray-100 text-gray-800 border-gray-200';
  if (overallWinner === 'productA') winnerColor = 'bg-blue-50 text-blue-900 border-blue-200';
  if (overallWinner === 'productB') winnerColor = 'bg-indigo-50 text-indigo-900 border-indigo-200';
  if (overallWinner === 'tie') winnerColor = 'bg-purple-50 text-purple-900 border-purple-200';

  let confidenceColor = 'bg-gray-100 text-gray-700';
  if (confidence === 'High') confidenceColor = 'bg-green-100 text-green-800';
  if (confidence === 'Medium') confidenceColor = 'bg-yellow-100 text-yellow-800';
  if (confidence === 'Low') confidenceColor = 'bg-red-100 text-red-800';

  return (
    <section className="mt-8">
      <div className="glass-card overflow-hidden">
        
        {/* Banner */}
        <div className={`p-8 border-b ${winnerColor} flex flex-col items-center text-center`}>
          <Trophy className={`w-12 h-12 mb-4 ${overallWinner === 'productA' ? 'text-blue-500' : overallWinner === 'productB' ? 'text-indigo-500' : 'text-purple-500'}`} />
          <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Overall Winner</h3>
          <h2 className="text-3xl font-bold mb-4">{winnerName}</h2>
          <p className="max-w-2xl text-lg opacity-90 leading-relaxed">{summary}</p>
        </div>

        {/* Details */}
        <div className="p-8 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {(chooseProductAIf?.length > 0) && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Choose First Product If...</h4>
                <ul className="space-y-2">
                  {chooseProductAIf.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(chooseProductBIf?.length > 0) && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Choose Second Product If...</h4>
                <ul className="space-y-2">
                  {chooseProductBIf.map((reason, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-indigo-500 mt-0.5">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Confidence Badge */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">AI Confidence:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${confidenceColor}`}>
                {confidence}
              </span>
            </div>
            <p className="text-sm text-gray-500 italic">
              {confidenceReason}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
