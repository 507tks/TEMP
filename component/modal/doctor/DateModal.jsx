function DateModal({ formData, setFormData, error, page }) {
  const handleDateChange = (event) => {
    setFormData({
      ...formData,
      beforeDate: event.target.value
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">Select Date</h2>
      <input type="date" value={formData.beforeDate} onChange={handleDateChange} className={`border rounded-md px-4 py-2 w-full focus:outline-none ${error[page] ? "border-red-500" : "border-gray-300 focus:border-blue-500"}`} />
      {error[page] && <p className="text-center text-red-500 text-sm mt-2">{error[page]}</p>}
    </div>
  );
}

export default DateModal;
