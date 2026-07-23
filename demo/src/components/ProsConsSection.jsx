import { CheckCircle2, MinusCircle } from 'lucide-react';

export default function ProsConsSection({ advantages, disadvantages, nameA, nameB }) {
  const hasDataA = advantages?.productA?.length > 0 || disadvantages?.productA?.length > 0;
  const hasDataB = advantages?.productB?.length > 0 || disadvantages?.productB?.length > 0;

  if (!hasDataA && !hasDataB) return null;

  return (
    <section>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Advantages & Disadvantages</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Product A */}
        <div className="glass-card p-6">
          <h4 className="font-semibold text-lg text-gray-900 mb-4 pb-2 border-b border-gray-100">{nameA}</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-3">Advantages</h5>
              <ul className="space-y-2">
                {advantages?.productA?.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                ))}
                {(!advantages?.productA || advantages.productA.length === 0) && (
                  <li className="text-gray-400 italic">No specific advantages listed.</li>
                )}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-3">Disadvantages</h5>
              <ul className="space-y-2">
                {disadvantages?.productA?.map((dis, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <MinusCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>{dis}</span>
                  </li>
                ))}
                {(!disadvantages?.productA || disadvantages.productA.length === 0) && (
                  <li className="text-gray-400 italic">No specific disadvantages listed.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Product B */}
        <div className="glass-card p-6">
          <h4 className="font-semibold text-lg text-gray-900 mb-4 pb-2 border-b border-gray-100">{nameB}</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-3">Advantages</h5>
              <ul className="space-y-2">
                {advantages?.productB?.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                ))}
                {(!advantages?.productB || advantages.productB.length === 0) && (
                  <li className="text-gray-400 italic">No specific advantages listed.</li>
                )}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-semibold text-red-700 uppercase tracking-wider mb-3">Disadvantages</h5>
              <ul className="space-y-2">
                {disadvantages?.productB?.map((dis, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <MinusCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>{dis}</span>
                  </li>
                ))}
                {(!disadvantages?.productB || disadvantages.productB.length === 0) && (
                  <li className="text-gray-400 italic">No specific disadvantages listed.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
