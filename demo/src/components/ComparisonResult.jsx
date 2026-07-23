import ProductOverview from './ProductOverview';
import SpecificationTable from './SpecificationTable';
import ProsConsSection from './ProsConsSection';
import PerformanceSection from './PerformanceSection';
import PriceValueSection from './PriceValueSection';
import BestSuitedFor from './BestSuitedFor';
import FinalRecommendation from './FinalRecommendation';

export default function ComparisonResult({ data }) {
  if (!data || !data.productA || !data.productB) return null;

  const { productA, productB, metadata } = data;

  return (
    <div className="w-full flex flex-col gap-10 fade-in">
      
      <ProductOverview a={productA} b={productB} />
      
      {data.specifications && data.specifications.length > 0 && (
        <SpecificationTable 
          specs={data.specifications} 
          nameA={productA.name} 
          nameB={productB.name} 
        />
      )}

      {(data.advantages || data.disadvantages) && (
        <ProsConsSection 
          advantages={data.advantages} 
          disadvantages={data.disadvantages}
          nameA={productA.name}
          nameB={productB.name}
        />
      )}

      {data.performance && (
        <PerformanceSection 
          performance={data.performance} 
          nameA={productA.name} 
          nameB={productB.name} 
        />
      )}

      {data.priceAndValue && (
        <PriceValueSection 
          priceAndValue={data.priceAndValue} 
          nameA={productA.name} 
          nameB={productB.name} 
        />
      )}

      {data.bestSuitedFor && (
        <BestSuitedFor 
          bestSuitedFor={data.bestSuitedFor} 
          nameA={productA.name} 
          nameB={productB.name} 
        />
      )}

      {data.finalRecommendation && (
        <FinalRecommendation recommendation={data.finalRecommendation} />
      )}

      {metadata && (metadata.regionalVariations?.length > 0 || metadata.informationLimitations?.length > 0) && (
        <div className="glass-card p-6 mt-8 bg-gray-50 border-dashed border-gray-300">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Metadata & Limitations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metadata.regionalVariations?.length > 0 && (
              <div>
                <strong className="block text-sm text-gray-700 mb-2">Regional Variations:</strong>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {metadata.regionalVariations.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
            {metadata.informationLimitations?.length > 0 && (
              <div>
                <strong className="block text-sm text-gray-700 mb-2">Information Limitations:</strong>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {metadata.informationLimitations.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
}
