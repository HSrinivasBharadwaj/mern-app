import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleList from './VehicleList';
import { useNavigate } from "react-router-dom";
import Modal from './Modal';

const DriverHome = () => {
  const navigate = useNavigate();
  const [showVehicles, setShowVehicles] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [goodsType, setGoodsType] = useState("");
  const [truckType, setTruckType] = useState("");
  const [goodsTypeOptions, setGoodsTypeOptions] = useState([]);
  const [truckTypeOptions, setTruckTypeOptions] = useState([]);
  const [error, setError] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [filterSource, setFilterSource] = useState("");
  const [filterDestination, setFilterDestination] = useState("");
  const [filterSourceSuggestions, setFilterSourceSuggestions] = useState([]);
  const [filterDestinationSuggestions, setFilterDestinationSuggestions] = useState([]);
  const [filterGoods, setFilterGoods] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetchAllVehicles()
    fetchGoodsTruck()
  }, [])

  const fetchGoodsTruck = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/options");
      console.log(response)
      setGoodsTypeOptions(response.data.goodsTypes);
      setTruckTypeOptions(response.data.truckTypes);

    } catch (error) {
      console.error("Error fetching goods and truck types:", error);
    }
  }


  const fetchAllVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/vehiclerouter");
      setShowVehicles(response.data.getvehicles)
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const fetchSuggestions = async (query, type) => {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1
        }
      })
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
      setError(error)
    }
  }

  useEffect(() => {
    if (source.length > 2) {
      fetchSuggestions(source, 'source')
    }
    else {
      setSourceSuggestions([])
    }
  }, [source])

  useEffect(() => {
    if (destination.length > 2) {
      fetchSuggestions(destination, 'destination')
    }
    else {
      setDestinationSuggestions([])
    }
  }, [destination])

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
    setSourceSuggestions([])
  }

  const handleDestinationSuggestion = (suggestion) => {
    setDestination(suggestion.display_name);
    setDestinationSuggestions([])
  }

  const handleFilterSourceSuggestion = (suggestion) => {
    setFilterSource(suggestion.display_name);
    setFilterSourceSuggestions([]);
  };

  const handleFilterDestinationSuggestion = (suggestion) => {
    setFilterDestination(suggestion.display_name);
    setFilterDestinationSuggestions([]);
  };


  const addVehicles = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:4000/api/vehiclerouter", {
        source,
        destination,
        weight,
        goodsType,
        truckType
      })

      setSource("");
      setDestination("");
      setWeight("");
      setTruckType("");
      setGoodsType("");
      fetchAllVehicles()
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/vehiclerouter/${id}`);
      setShowVehicles(showVehicles.filter(vehicle => vehicle._id !== id))
    } catch (error) {
      setError(error.response.data.message)
    }
  }


  const fetchGoodsByLocation = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/goodsrouter/location", {
        params: {
          source: filterSource,
          destination: filterDestination,
        }
      })
      setFilterGoods(response.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  const goToDealer = () => {
    navigate("/dealerhome")
  }
  return (
    <div className='container mx-auto p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='font-bold text-4xl mb-4 text-center'>Vehicles List</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ">
          Add Vehicles
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addVehicles}
        source={source}
        setSource={setSource}
        destination={destination}
        setDestination={setDestination}
        weight={weight}
        setWeight={setWeight}
        kilometres={""}
        setKilometres={() => { }}
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
      <h1 className='font-bold text-2xl text-center mt-10 mb-5'>Filtered Goods</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='relative'>
          <input
            type='text'
            name='filterSource'
            placeholder='Filter Source'
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className='border px-4 py-2 w-full'
          />
          {filterSourceSuggestions.length > 0 && (
            <ul className='absolute bg-white border mt-1 w-full max-h-60 overflow-auto'>
              {filterSourceSuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleFilterSourceSuggestion(suggestion)}
                  className='cursor-pointer p-2 hover:bg-gray-100'
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='relative'>
          <input
            type='text'
            name='filterDestination'
            placeholder='Filter Destination'
            value={filterDestination}
            onChange={(e) => setFilterDestination(e.target.value)}
            className='border px-4 py-2 w-full'
          />
          {filterDestinationSuggestions.length > 0 && (
            <ul className='absolute bg-white border mt-1 w-full max-h-60 overflow-auto'>
              {filterDestinationSuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleFilterDestinationSuggestion(suggestion)}
                  className='cursor-pointer p-2 hover:bg-gray-100'
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10"
            onClick={fetchGoodsByLocation}
          >
            Search
          </button>
        </div>
      </div>
      {/* Table for show vehicles */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Source</th>
            <th className="py-2 px-4 border-b">Destination</th>
            <th className="py-2 px-4 border-b">weight</th>
            <th className="py-2 px-4 border-b">goodsType</th>
            <th className="py-2 px-4 border-b">truckType</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <VehicleList fetchAllVehicles={fetchAllVehicles} showVehicles={showVehicles} setShowVehicles={setShowVehicles} deleteVehicle={deleteVehicle} />
        </tbody>
      </table>

      {/* Table for filtered Data */}
      {filterGoods.length > 0 && (
        <>
          <h2 className='font-bold text-2xl mt-6 mb-4'>Filtered Goods</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {/* Table headers */}
                <th className="py-2">Source</th>
                <th className="py-2">Destination</th>
                <th className="py-2">Weight</th>
                <th className="py-2">Goods Type</th>
                <th className="py-2">Truck Type</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <VehicleList isBooking={true} fetchAllVehicles={fetchAllVehicles} showVehicles={filterGoods} setShowVehicles={setShowVehicles} deleteVehicle={deleteVehicle} />
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default DriverHome