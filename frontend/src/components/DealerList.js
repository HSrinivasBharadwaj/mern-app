import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const DealerList = ({ showGoods, deleteGood, fetchAllGoods, isBooking = false }) => {
    const [id, setId] = useState(null);
    const [data, setData] = useState({});
    const [bookedVehicles, setBookedVehicles] = useState([]);
    const [statusOptions] = useState(['Not Booked', 'Booked', 'In Transit', 'Delivered']);

    const handleEditClick = (good) => {
        setId(good._id);
        setData({ ...good });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:4000/api/goodsrouter/${data._id}`, data);
            setId(null);  
            fetchAllGoods();  
            toast.success("Goods updated successfully")
        } catch (error) {
            console.error("Error updating goods:", error);
            toast.error("Failed to update goods.");
        }
    };

    const handleCancel = () => {
        setId(null);  
    };

    const handleBook = (vehicle) => {
        setBookedVehicles([...bookedVehicles, vehicle._id]);
    };

    const isVehicleBooked = (vehicleId) => {
        return bookedVehicles.includes(vehicleId);
    };

    return (
        <>
            {showGoods && showGoods.length > 0 ? (
                showGoods.map((good) => (
                    <tr
                        key={good._id}
                        className={`hover:bg-gray-100 ${isVehicleBooked(good._id) ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                        disabled={isVehicleBooked(good._id)}
                    >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-56">
                            {id === good._id && !isBooking ? (
                                <input
                                    type="text"
                                    name="source"
                                    value={data.source}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                good.source
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-56">
                            {id === good._id && !isBooking ? (
                                <input
                                    type="text"
                                    name="destination"
                                    value={data.destination}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full truncate max-w-56"
                                />
                            ) : (
                                good.destination
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {id === good._id && !isBooking ? (
                                <input
                                    type="number"
                                    name="weight"
                                    value={data.weight}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                good.weight
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {id === good._id && !isBooking ? (
                                <input
                                    type="number"
                                    name="kilometres"
                                    value={data.kilometres}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                good.kilometres
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {id === good._id && !isBooking ? (
                                <input
                                    type="text"
                                    name="goodsType"
                                    value={data.goodsType}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                good.goodsType
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {id === good._id && !isBooking ? (
                                <input
                                    type="text"
                                    name="truckType"
                                    value={data.truckType}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            ) : (
                                good.truckType
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {isBooking ? (
                                <button
                                    onClick={() => handleBook(good)}
                                    className={`bg-blue-500 text-white cursor-pointer mx-2 p-2 rounded ${isVehicleBooked(good._id) ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                                    disabled={isVehicleBooked(good._id)}
                                >
                                    {isVehicleBooked(good._id) ? 'Booked' : 'Book'}
                                </button>
                            ) : (
                                <>
                                    {id === good._id ? (
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
                                                onClick={() => handleEditClick(good)}
                                                className='bg-orange-500 text-white cursor-pointer mx-2 p-2 rounded'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteGood(good._id)}
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
                    <td className='font-bold text-center mx-auto py-4' colSpan="7">No Goods to show</td>
                </tr>
            )}
        </>
    );
};

export default DealerList;

// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const DealerList = ({ showGoods, deleteGood, fetchAllGoods, isBooking = false }) => {
//     const [id, setId] = useState(null);
//     const [data, setData] = useState({});
//     const [statusMap, setStatusMap] = useState({});

//     useEffect(() => {
//         if (showGoods) {
//             const initialStatusMap = showGoods.reduce((acc, good) => {
//                 acc[good._id] = good.status || 'Not Booked';
//                 return acc;
//             }, {});
//             setStatusMap(initialStatusMap);
//         }
//     }, [showGoods]);

//     const handleEditClick = (good) => {
//         setId(good._id);
//         setData({ ...good });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setData({ ...data, [name]: value });
//     };

//     const handleSave = async () => {
//         try {
//             await axios.put(`http://localhost:4000/api/goodsrouter/${data._id}`, data);
//             setId(null);
//             fetchAllGoods();
//             toast.success("Goods updated successfully");
//         } catch (error) {
//             console.error("Error updating goods:", error);
//             toast.error("Failed to update goods.");
//         }
//     };

//     const handleCancel = () => {
//         setId(null);
//     };

//     const handleStatusChange = async (good) => {
//         let newStatus;
//         switch (statusMap[good._id]) {
//             case 'Not Booked':
//                 newStatus = 'Booked';
//                 break;
//             case 'Booked':
//                 newStatus = 'In Transit';
//                 break;
//             case 'In Transit':
//                 newStatus = 'Delivered';
//                 break;
//             case 'Delivered':
//                 newStatus = 'Not Booked';
//                 break;
//             default:
//                 newStatus = 'Not Booked';
//         }

//         try {
//             await axios.put(`http://localhost:4000/api/goodsrouter/${good._id}`, { ...good, status: newStatus });
//             setStatusMap((prevMap) => ({ ...prevMap, [good._id]: newStatus }));
//             toast.success(`Status updated to ${newStatus}`);
//         } catch (error) {
//             console.error("Error updating status:", error);
//             toast.error("Failed to update status.");
//         }
//     };

//     const getStatusButtonStyle = (status) => {
//         switch (status) {
//             case 'Booked':
//                 return 'bg-green-500';
//             case 'In Transit':
//                 return 'bg-orange-500';
//             case 'Delivered':
//                 return 'bg-red-500';
//             default:
//                 return 'bg-blue-500';
//         }
//     };

//     return (
//         <>
//             {showGoods && showGoods.length > 0 ? (
//                 showGoods.map((good) => (
//                     <tr key={good._id} className="hover:bg-gray-100">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-56">
//                             {id === good._id && !isBooking ? (
//                                 <input
//                                     type="text"
//                                     name="source"
//                                     value={data.source}
//                                     onChange={handleChange}
//                                     className="border p-2 rounded w-full"
//                                 />
//                             ) : (
//                                 good.source
//                             )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-56">
//                             {id === good._id && !isBooking ? (
//                                 <input
//                                     type="text"
//                                     name="destination"
//                                     value={data.destination}
//                                     onChange={handleChange}
//                                     className="border p-2 rounded w-full truncate max-w-56"
//                                 />
//                             ) : (
//                                 good.destination
//                             )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                             {id === good._id && !isBooking ? (
//                                 <input
//                                     type="number"
//                                     name="weight"
//                                     value={data.weight}
//                                     onChange={handleChange}
//                                     className="border p-2 rounded w-full"
//                                 />
//                             ) : (
//                                 good.weight
//                             )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                             {id === good._id && !isBooking ? (
//                                 <input
//                                     type="number"
//                                     name="kilometres"
//                                     value={data.kilometres}
//                                     onChange={handleChange}
//                                     className="border p-2 rounded w-full"
//                                 />
//                             ) : (
//                                 good.kilometres
//                             )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                             {id === good._id && !isBooking ? (
//                                 <input
//                                     type="text"
//                                     name="goodsType"
//                                     value={data.goodsType}
//                                     onChange={handleChange}
//                                     className="border p-2 rounded w-full"
//                                 />
//                             ) : (
//                                 good.goodsType
//                             )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                             {id === good._id && !isBooking ? (
//                                 <input
//                                     type="text"
//                                     name="truckType"
//                                     value={data.truckType}
//                                     onChange={handleChange}
//                                     className="border p-2 rounded w-full"
//                                 />
//                             ) : (
//                                 good.truckType
//                             )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                             {isBooking ? (
//                                 <button
//                                     onClick={() => handleStatusChange(good)}
//                                     className={`text-white cursor-pointer mx-2 p-2 rounded ${getStatusButtonStyle(statusMap[good._id])}`}
//                                     disabled={statusMap[good._id] === 'Delivered'}
//                                 >
//                                     {statusMap[good._id]}
//                                 </button>
//                             ) : (
//                                 <>
//                                     {id === good._id ? (
//                                         <>
//                                             <button
//                                                 onClick={handleSave}
//                                                 className='bg-green-500 text-white cursor-pointer mx-2 p-2 rounded'
//                                             >
//                                                 Save
//                                             </button>
//                                             <button
//                                                 onClick={handleCancel}
//                                                 className='bg-red-500 text-white cursor-pointer mx-2 p-2 rounded'
//                                             >
//                                                 Cancel
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <button
//                                                 onClick={() => handleEditClick(good)}
//                                                 className='bg-orange-500 text-white cursor-pointer mx-2 p-2 rounded'
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => deleteGood(good._id)}
//                                                 className='bg-red-500 text-white cursor-pointer mx-2 p-2 rounded'
//                                             >
//                                                 Delete
//                                             </button>
//                                         </>
//                                     )}
//                                 </>
//                             )}
//                         </td>
//                     </tr>
//                 ))
//             ) : (
//                 <tr>
//                     <td className='font-bold text-center mx-auto py-4' colSpan="7">No Goods to show</td>
//                 </tr>
//             )}
//         </>
//     );
// };

// export default DealerList;

