import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { FaEye, FaMale, FaFemale, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router'; 

const divisions = ["Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];

const AllBioDatas = () => {
  const axiosSecure = UseAxiosSecure();

  const [filters, setFilters] = useState({
    biodataType: '',
    division: '',
    minAge: '',
    maxAge: '',
  });
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data, isLoading, error } = useQuery({
    queryKey: ['allBiodatas', filters, sortOrder, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters.biodataType) params.append('biodataType', filters.biodataType);
      if (filters.division) params.append('division', filters.division);
      if (filters.minAge) params.append('minAge', filters.minAge);
      if (filters.maxAge) params.append('maxAge', filters.maxAge);
      params.append('sortOrder', sortOrder);
      params.append('page', currentPage);
      params.append('limit', itemsPerPage);

      const res = await axiosSecure.get(`/allBiodatas?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const totalPages = data?.totalPages || 0;

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1);
  };

  return (
    <div className=" mt-20 flex min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      {/* Sidebar Filter */}
      <aside className="w-72 sticky top-0 h-screen bg-white shadow-xl border-r px-6 py-8 overflow-y-auto">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center gap-2">
          <FaFilter /> Filter Biodatas
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Biodata Type</label>
            <select
              onChange={e => handleFilterChange('biodataType', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              value={filters.biodataType}
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Division</label>
            <select
              onChange={e => handleFilterChange('division', e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              value={filters.division}
            >
              <option value="">All</option>
              {divisions.map((div, idx) => (
                <option key={idx} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Age Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 border border-gray-300 rounded-md p-2"
                onChange={e => handleFilterChange('minAge', e.target.value ? Number(e.target.value) : '')}
                value={filters.minAge}
                min={0}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 border border-gray-300 rounded-md p-2"
                onChange={e => handleFilterChange('maxAge', e.target.value ? Number(e.target.value) : '')}
                value={filters.maxAge}
                min={0}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Sort by Age</label>
            <select
              value={sortOrder}
              onChange={e => {
                setSortOrder(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Main Biodata List */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Biodatas</h1>

        {isLoading ? (
        <div className='flex justify-center'>
          <span className="loading loading-ball loading-xs"></span>
<span className="loading loading-ball loading-sm"></span>
<span className="loading loading-ball loading-md"></span>
<span className="loading loading-ball loading-lg"></span>
<span className="loading loading-ball loading-xl"></span>
        </div>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">Error loading data</p>
        ) : data?.biodatas.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No biodata found.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {data.biodatas.map(bio => (
                <div
                  key={bio._id}
                  className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
                >
                  <img
                    src={bio.profileImage}
                    alt={bio.name}
                    className="w-28 h-28 mx-auto object-cover rounded-full border-4 border-indigo-300 shadow-md"
                  />
                  <h2 className="mt-4 text-center text-xl font-semibold text-gray-800">{bio.name}</h2>

                  <p className="text-center text-gray-500 text-sm">
                    Biodata ID: <span className="font-semibold">{bio.id}</span>
                  </p>

                  <div className="mt-2 text-center text-gray-600 flex justify-center gap-2 items-center text-sm">
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

                  <div className="mt-3 text-center text-sm text-gray-600 space-y-1">
                    <p>
                      Division: <strong>{bio.permanentDivision}</strong>
                    </p>
                    <p>
                      Age: <strong>{bio.age}</strong>
                    </p>
                    <p>
                      Occupation: <strong>{bio.occupation}</strong>
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <Link
                      to={`/biodata/${bio.id}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full hover:scale-105 transition"
                    >
                      <FaEye /> View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage(old => Math.max(old - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border text-sm bg-white hover:bg-indigo-100 disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded border text-sm ${
                    currentPage === index + 1
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white hover:bg-indigo-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(old => Math.min(old + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border text-sm bg-white hover:bg-indigo-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AllBioDatas;
