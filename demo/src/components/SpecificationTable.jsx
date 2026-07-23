export default function SpecificationTable({ specs, nameA, nameB }) {
  return (
    <section>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Key Specifications</h3>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 font-semibold text-gray-700 w-1/3">Specification</th>
                <th className="py-4 px-6 font-semibold text-gray-700 w-1/3 border-l border-gray-200">{nameA}</th>
                <th className="py-4 px-6 font-semibold text-gray-700 w-1/3 border-l border-gray-200">{nameB}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {specs.map((spec, index) => {
                const aIsBetter = spec.better === 'productA';
                const bIsBetter = spec.better === 'productB';

                return (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{spec.category}</td>
                    <td className={`py-4 px-6 text-gray-600 border-l border-gray-200 ${aIsBetter ? 'bg-blue-50/30 font-medium text-blue-900' : ''}`}>
                      {spec.productA}
                    </td>
                    <td className={`py-4 px-6 text-gray-600 border-l border-gray-200 ${bIsBetter ? 'bg-indigo-50/30 font-medium text-indigo-900' : ''}`}>
                      {spec.productB}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
