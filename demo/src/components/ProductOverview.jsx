export default function ProductOverview({ a, b }) {
  return (
    <section>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Product Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 flex flex-col h-full border-t-4 border-t-blue-500">
          <h4 className="text-2xl font-bold text-gray-900 mb-3">{a.name}</h4>
          <p className="text-gray-600 leading-relaxed flex-grow">{a.overview}</p>
        </div>
        <div className="glass-card p-6 flex flex-col h-full border-t-4 border-t-indigo-500">
          <h4 className="text-2xl font-bold text-gray-900 mb-3">{b.name}</h4>
          <p className="text-gray-600 leading-relaxed flex-grow">{b.overview}</p>
        </div>
      </div>
    </section>
  );
}
