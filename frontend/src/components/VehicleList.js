import axios from 'axios';
import React, { useState } from 'react';

const VehicleList = ({ showVehicles, deleteVehicle, fetchAllVehicles, isBooking = false }) => {
    const [id, setId] = useState(null);
    const [data, setData] = useState({});
    const [bookedGoods, setBookedGoods] = useState([]);

    const handleEditClick = (vehicle) => {
        setId(vehicle._id);
        setData({ ...vehicle });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:4000/api/vehiclerouter/${data._id}`, data);
            setId(null);
            fetchAllVehicles();
        } catch (error) {
            console.error("Error updating vehicle:", error);
        }
    };

    const handleCancel = () => {
        setId(null);
    };

    const handleBook = (vehicle) => {
        setBookedGoods([...bookedGoods, vehicle._id]);
    };

    const isGoodBooked = (goodId) => {
        return bookedGoods.includes(goodId);
    };

    return (
        <>
            {showVehicles && showVehicles.length > 0 ? (
                showVehicles.map((vehicle) => (
                    <tr
                        key={vehicle._id}
                        className={`hover:bg-gray-100 ${isGoodBooked(vehicle._id) ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                        disabled={isGoodBooked(vehicle._id)}
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-56">
                            {id === vehicle._id && !isBooking ? (
                                <input
                                    type="text"
                                    name="source"
                                    value={data.source}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                vehicle.source
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-56">
                            {id === vehicle._id && !isBooking ? (
                                <input
                                    type="text"
                                    name="destination"
                                    value={data.destination}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                vehicle.destination
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {id === vehicle._id && !isBooking ? (
                                <input
                                    type="number"
                                    name="weight"
                                    value={data.weight}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                vehicle.weight
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {id === vehicle._id && !isBooking ? (
                                <input
                                    type="text"
                                    name="goodsType"
                                    value={data.goodsType}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                vehicle.goodsType
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {id === vehicle._id && !isBooking ? (
                                <input
                                    type="text"
                                    name="truckType"
                                    value={data.truckType}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                vehicle.truckType
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {isBooking ? (
                                <button
                                    onClick={() => handleBook(vehicle)}
                                    className={`bg-blue-500 text-white cursor-pointer mx-2 p-2 rounded ${isGoodBooked(vehicle._id) ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                                    disabled={isGoodBooked(vehicle._id)}
                                >
                                    {isGoodBooked(vehicle._id) ? 'Booked' : 'Book'}
                                </button>
                            ) : (
                                <>
                                    {id === vehicle._id ? (
                                        <>
                                            <button
                                                onClick={handleSave}
                                                className='bg-green-500 text-white cursor-pointer mx-2 p-2 rounded'
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className='bg-red-500 text-white cursor-pointer mx-2 p-2 rounded'
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEditClick(vehicle)}
                                                className='bg-orange-500 text-white cursor-pointer mx-2 p-2 rounded'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteVehicle(vehicle._id)}
                                                className='bg-red-500 text-white cursor-pointer mx-2 p-2 rounded'
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td className='font-bold text-center mx-auto py-4' colSpan="6">No Vehicles to show</td>
                </tr>
            )}
        </>
    );
};

export default VehicleList;
