import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DealerList from './DealerList';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const DealerHome = () => {
  const navigate = useNavigate();
  const [showGoods, setShowGoods] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [kilometres, setKilometres] = useState('');
  const [goodsTypeOptions, setGoodsTypeOptions] = useState([]);
  const [truckTypeOptions, setTruckTypeOptions] = useState([]);
  const [goodsType, setGoodsType] = useState('');
  const [truckType, setTruckType] = useState('');
  const [error, setError] = useState('');
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [filterSource, setFilterSource] = useState("");
  const [filterDestination, setFilterDestination] = useState("");
  const [filterSourceSuggestions, setFilterSourceSuggestions] = useState([]);
  const [filterDestinationSuggestions, setFilterDestinationSuggestions] = useState([]);
  const [filterVehicles, setFilterVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllGoods();
    fetchGoodsTruck()
  }, []);

  const fetchGoodsTruck = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/options");
      setGoodsTypeOptions(response.data.goodsTypes);
      setTruckTypeOptions(response.data.truckTypes);

    } catch (error) {
      console.error("Error fetching goods and truck types:", error);
    }
  }

  const fetchAllGoods = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/goodsrouter');
      setShowGoods(response.data.goods);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const fetchSuggestions = async (query, type) => {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: query,
          format: "json",
          addressdetails: 1
        }
      });
      if (type === "source") {
        setSourceSuggestions(response.data);
      } else if (type === "destination") {
        setDestinationSuggestions(response.data);
      } else if (type === "filterSource") {
        setFilterSourceSuggestions(response.data);
      } else if (type === "filterDestination") {
        setFilterDestinationSuggestions(response.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (source.length > 2) {
      fetchSuggestions(source, 'source');
    } else {
      setSourceSuggestions([]);
    }
  }, [source]);

  useEffect(() => {
    if (destination.length > 2) {
      fetchSuggestions(destination, 'destination');
    } else {
      setDestinationSuggestions([]);
    }
  }, [destination]);

  useEffect(() => {
    if (filterSource.length > 2) {
      fetchSuggestions(filterSource, 'filterSource');
    } else {
      setFilterSourceSuggestions([]);
    }
  }, [filterSource]);

  useEffect(() => {
    if (filterDestination.length > 2) {
      fetchSuggestions(filterDestination, 'filterDestination');
    } else {
      setFilterDestinationSuggestions([]);
    }
  }, [filterDestination]);

  const handleSourceSuggestion = (suggestion) => {
    setSource(suggestion.display_name);
    setSourceSuggestions([]);
  };

  const handleDestinationSuggestion = (suggestion) => {
    setDestination(suggestion.display_name);
    setDestinationSuggestions([]);
  };

  const handleFilterSourceSuggestion = (suggestion) => {
    setFilterSource(suggestion.display_name);
    setFilterSourceSuggestions([]);
  };

  const handleFilterDestinationSuggestion = (suggestion) => {
    setFilterDestination(suggestion.display_name);
    setFilterDestinationSuggestions([]);
  };

  const addGoods = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/goodsrouter', {
        source,
        destination,
        weight,
        kilometres,
        goodsType,
        truckType,
      });
      setSource('');
      setDestination('');
      setWeight('');
      setKilometres('');
      setGoodsType('');
      setTruckType('');
      fetchAllGoods();
      toast.success("Goods added successfully!");
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Error adding goods!");
    }
  };

  const deleteGood = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/goodsrouter/${id}`);
      setShowGoods(showGoods.filter((good) => good._id !== id));
      toast.success("Good deleted successfully!");
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Error deleting good!");
    }
  };

  const fetchVehiclesByLocation = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/vehiclerouter/location", {
        params: {
          source: filterSource,
          destination: filterDestination
        }
      });
      setFilterVehicles(response.data);
    } catch (error) {
      setError(error);
      toast.error("Error fetching vehicles!");
    }
  };

  

  return (
    <div className='container mx-auto p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-4xl font-bold text-gray-800'>Available Goods</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add Goods
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addGoods}
        source={source}
        setSource={setSource}
        destination={destination}
        setDestination={setDestination}
        weight={weight}
        setWeight={setWeight}
        kilometres={kilometres}
        setKilometres={setKilometres}
        goodsType={goodsType}
        setGoodsType={setGoodsType}
        truckType={truckType}
        setTruckType={setTruckType}
        sourceSuggestions={sourceSuggestions}
        handleSourceSuggestion={handleSourceSuggestion}
        destinationSuggestions={destinationSuggestions}
        handleDestinationSuggestion={handleDestinationSuggestion}
        goodsTypeOptions={goodsTypeOptions}   
        truckTypeOptions={truckTypeOptions}  
      />

      {/* Filter Section */}
      <div className='my-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Filter Vehicles</h2>
        <div className='flex flex-col md:flex-row md:space-x-4'>
          <div className='relative w-full md:w-1/2 mb-4'>
            <input
              type='text'
              name='filterSource'
              placeholder='Filter Source'
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className='border px-4 py-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {filterSourceSuggestions.length > 0 && (
              <ul className='absolute bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-md max-h-60 overflow-auto'>
                {filterSourceSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => handleFilterSourceSuggestion(suggestion)}
                    className='cursor-pointer p-2 hover:bg-gray-200'
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='relative w-full md:w-1/2'>
            <input
              type='text'
              name='filterDestination'
              placeholder='Filter Destination'
              value={filterDestination}
              onChange={(e) => setFilterDestination(e.target.value)}
              className='border px-4 py-2 w-full rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {filterDestinationSuggestions.length > 0 && (
              <ul className='absolute bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-md max-h-60 overflow-auto'>
                {filterDestinationSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => handleFilterDestinationSuggestion(suggestion)}
                    className='cursor-pointer p-2 hover:bg-gray-200'
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2 w-1/2"
              onClick={fetchVehiclesByLocation}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Table for ShowGoods */}
      <div className='bg-white shadow-lg rounded-lg overflow-x-auto'>
        <h2 className='text-2xl font-semibold text-gray-800 p-4 text-center'>All Goods</h2>
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Table headers */}
              <th className="py-3 px-6 text-left text-gray-600">Source</th>
              <th className="py-3 px-6 text-left text-gray-600">Destination</th>
              <th className="py-3 px-6 text-left text-gray-600">Weight</th>
              <th className="py-3 px-6 text-left text-gray-600">Kilometres</th>
              <th className="py-3 px-6 text-left text-gray-600">Goods Type</th>
              <th className="py-3 px-6 text-left text-gray-600">Truck Type</th>
              <th className="py-3 px-6 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <DealerList fetchAllGoods={fetchAllGoods} showGoods={showGoods} setShowGoods={setShowGoods} deleteGood={deleteGood} />
          </tbody>
        </table>
      </div>

      {/* Table for Filtered Vehicles */}
      {filterVehicles.length > 0 && (
        <div className='bg-white shadow-lg rounded-lg overflow-x-auto mt-8'>
          <h2 className='text-2xl font-semibold text-gray-800 p-4'>Filtered Vehicles</h2>
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Table headers */}
                <th className="py-3 px-6 text-left text-gray-600">Source</th>
                <th className="py-3 px-6 text-left text-gray-600">Destination</th>
                <th className="py-3 px-6 text-left text-gray-600">Weight</th>
                <th className="py-3 px-6 text-left text-gray-600">Kilometres</th>
                <th className="py-3 px-6 text-left text-gray-600">Goods Type</th>
                <th className="py-3 px-6 text-left text-gray-600">Truck Type</th>
                <th className="py-3 px-6 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <DealerList isBooking={true} fetchAllGoods={fetchAllGoods} showGoods={filterVehicles} setShowGoods={setShowGoods} deleteGood={deleteGood} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DealerHome;
