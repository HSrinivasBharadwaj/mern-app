import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("name");
  
  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const currentPage = location.pathname;
  const getText = currentPage.includes("dealer") ? "driverHome" : "dealerHome";

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Logistics App</h1>
          {token && (
            <a
              href={`/${getText}`} 
              className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              {getText}
            </a>
          )}
        </div>
        
        <div>
          {token ? (
            <>
              <span className="mr-4">Welcome, {name}!</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
