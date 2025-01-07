import React from 'react'
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/login'); 
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl text-gray-700">
        Oops! The page you are looking for doesn't exist.
      </p>
      <button
        onClick={goHome}
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
      >
        Go Back Home
      </button>
    </div>
  )
}

export default Page404