const InlineBarGraph = ({ title, items, max }) => (
  <div className="p-6 bg-white border border-gray-900 rounded-lg shadow-md">
    <h2 className="text-xl text-black font-semibold mb-2">{title}</h2>

    {items.map((item, index) => (
      <div key={index} className="mb-4">
        <p className="text-sm font-medium text-gray-900">
          {item.title}:{item.value}/{max}
        </p>
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-full bg-blue-900 rounded"
            style={{
              width: item.value === 0 ? "0%" : `${(item.value / max) * 100}%`,
              minWidth: item.value > 0 ? "5%" : "0", // Ensures a small visual for non-zero values
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

export default InlineBarGraph;
