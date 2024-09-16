import React from 'react';

const Modal = ({
  isOpen,
  onClose,
  onAdd,
  source,
  setSource,
  destination,
  setDestination,
  weight,
  setWeight,
  kilometres,
  setKilometres,
  goodsType,
  setGoodsType,
  truckType,
  setTruckType,
  sourceSuggestions,
  handleSourceSuggestion,
  destinationSuggestions,
  handleDestinationSuggestion,
  goodsTypeOptions,
  truckTypeOptions
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-md z-10 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4"></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Source Input */}
          <div className="relative">
            <input
              type="text"
              className="border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            {sourceSuggestions && sourceSuggestions.length > 0 && (
              <ul className="absolute bg-white border mt-1 w-full max-h-60 overflow-auto">
                {sourceSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => handleSourceSuggestion(suggestion)}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Destination Input */}
          <div className="relative">
            <input
              type="text"
              className="border rounded w-full py-2 px-3 text-gray-700"
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            {destinationSuggestions && destinationSuggestions.length > 0 && (
              <ul className="absolute bg-white border mt-1 w-full max-h-60 overflow-auto">
                {destinationSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => handleDestinationSuggestion(suggestion)}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Weight Input */}
          <input
            type="number"
            className="border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          {/* Kilometres Input */}
          <input
            type="number"
            className="border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Kilometres"
            value={kilometres}
            onChange={(e) => setKilometres(e.target.value)}
          />

          <select
            value={goodsType}
            onChange={(e) => setGoodsType(e.target.value)}
            className='border px-4 py-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value="">Select Goods Type</option>
            {goodsTypeOptions.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={truckType}
            onChange={(e) => setTruckType(e.target.value)}
            className='border px-4 py-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value="">Select Truck Type</option>
            {truckTypeOptions.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onAdd}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 "
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
