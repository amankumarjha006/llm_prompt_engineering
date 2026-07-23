export default function PerformanceSection({ performance, nameA, nameB }) {
  return (
    <section>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Performance</h3>
      <div className="glass-card p-6 md:p-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{nameA} Performance</h4>
            <p className="text-gray-700 leading-relaxed">{performance.productA}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">{nameB} Performance</h4>
            <p className="text-gray-700 leading-relaxed">{performance.productB}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-2">Overall Comparison</h4>
          <p className="text-gray-700 leading-relaxed">{performance.comparison}</p>
        </div>

      </div>
    </section>
  );
}
