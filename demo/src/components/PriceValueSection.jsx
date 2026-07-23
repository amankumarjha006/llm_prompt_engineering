import { DollarSign } from 'lucide-react';

export default function PriceValueSection({ priceAndValue, nameA, nameB }) {
  return (
    <section>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Price & Value for Money</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass-card p-6 bg-gradient-to-br from-white to-gray-50">
          <h4 className="font-semibold text-gray-900 mb-1">{nameA}</h4>
          <div className="flex items-center gap-1 text-blue-600 mb-4">
            <DollarSign className="w-5 h-5" />
            <span className="text-2xl font-bold">{priceAndValue.productA.price}</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{priceAndValue.productA.assessment}</p>
        </div>

        <div className="glass-card p-6 bg-gradient-to-br from-white to-gray-50">
          <h4 className="font-semibold text-gray-900 mb-1">{nameB}</h4>
          <div className="flex items-center gap-1 text-indigo-600 mb-4">
            <DollarSign className="w-5 h-5" />
            <span className="text-2xl font-bold">{priceAndValue.productB.price}</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{priceAndValue.productB.assessment}</p>
        </div>
      </div>

      <div className="glass-card p-6 bg-gray-50 border-l-4 border-l-gray-400">
        <h4 className="font-semibold text-gray-900 mb-2">Value Comparison</h4>
        <p className="text-gray-700 leading-relaxed">{priceAndValue.comparison}</p>
      </div>

    </section>
  );
}
