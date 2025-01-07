const Card = ({ title, value }) => {
  return (
    <div className="w-full h-full mt-4 bg-theme text-white border border-gray-200 rounded-lg shadow p-4 transform transition-transform hover:scale-105 overflow-hidden flex flex-col items-center justify-between">
      <span className="text-4xl font-extrabold">{value}</span>
      <p className="text-lg font-semibold text-center">{title}</p>
    </div>
  );
};

export default Card;
