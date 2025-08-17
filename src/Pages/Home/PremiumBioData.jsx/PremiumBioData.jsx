import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { FaMale, FaFemale, FaEye } from 'react-icons/fa';
import { Link } from 'react-router'; // সঠিক ইমপোর্ট

const PremiumBioData = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: premiumBiodatas = [], isLoading, error } = useQuery({
    queryKey: ['premium-biodatas'],
    queryFn: async () => {
      const res = await axiosSecure.get('/premium-biodatas'); // API ঠিক থাকলে
      return res.data;
    },
  });

  if (isLoading) return(
     <div className="flex justify-center min-h-screen">
       <span className="loading loading-ball loading-xs"></span>
<span className="loading loading-ball loading-sm"></span>
<span className="loading loading-ball loading-md"></span>
<span className="loading loading-ball loading-lg"></span>
<span className="loading loading-ball loading-xl"></span>
      </div>
  );
  if (error) return <p className="text-center text-red-500">Error loading data: {error.message}</p>;

  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-12">
        Our Premium BioDatas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {premiumBiodatas.map((bio) => (
          <div
            key={bio._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center"
          >
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md ring-4 ring-blue-200">
              <img
                src={bio.profileImage}
                alt={bio.name}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-900">{bio.name}</h3>

            <div className="mt-2 flex items-center space-x-2 text-sm font-semibold text-blue-600">
              {bio.biodataType === 'Male' ? (
                <>
                  <FaMale className="text-blue-500" />
                  <span>Male</span>
                </>
              ) : (
                <>
                  <FaFemale className="text-pink-500" />
                  <span>Female</span>
                </>
              )}
            </div>

            <div className="mt-4 w-full text-gray-700 text-center text-sm space-y-2">
              <p><strong>Division:</strong> {bio.permanentDivision}</p>
              <p><strong>Age:</strong> {bio.age}</p>
              <p><strong>Occupation:</strong> {bio.occupation}</p>
            </div>

            <Link
              to={`/biodata/${bio.id}`}
              className="inline-flex items-center gap-2 px-6 py-2 mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-indigo-600 hover:to-blue-500 transition"
            >
              <FaEye /> View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumBioData;
