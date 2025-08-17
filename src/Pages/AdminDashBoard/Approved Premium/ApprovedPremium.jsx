import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const ApprovedPremium = () => {
  const axiosSecure = UseAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [biodataMap, setBiodataMap] = useState({});

 
  const fetchRequests = async () => {
  setLoading(true);
  try {
    // Premium requests fetch
    const res = await axiosSecure.get('/premium-requests');
    setRequests(res.data);

    // সব biodata fetch করে map তৈরি
    const biodataRes = await axiosSecure.get('/allBiodatas');
    const allBiodatas = biodataRes.data.biodatas || [];

    const map = {};
    res.data.forEach(req => {
      const match = allBiodatas.find(b =>
        b._id?.toString() === req.biodataId?.toString() ||
        b.id === req.biodataId
      );
      if (match) {
        map[req.biodataId] = {
          name: match.name,
          id: match.id,
        };
      }
    });

    setBiodataMap(map);
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'Failed to load premium requests', 'error');
  } finally {
    setLoading(false);
  }
};





  useEffect(() => {
    fetchRequests();
  }, []);

  const handleMakePremium = async (requestId) => {
    try {
      const confirm = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to make this biodata premium?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, approve it!',
      });

      if (confirm.isConfirmed) {
        // Approve premium request API call (PATCH)
   await axiosSecure.patch(`/premium-requests/${requestId}`, { approve: true });
        Swal.fire('Success', 'Biodata has been marked as premium!', 'success');
        fetchRequests();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to approve premium request', 'error');
    }
  };

  if (loading) return ( <div className="flex  justify-center min-h-screen">
        <span className="loading loading-ball loading-xs"></span>
<span className="loading loading-ball loading-sm"></span>
<span className="loading loading-ball loading-md"></span>
<span className="loading loading-ball loading-lg"></span>
<span className="loading loading-ball loading-xl"></span>
      </div>)
  if (requests.length === 0) return <p className="text-center mt-10 text-gray-500">No pending premium requests.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-rose-600">Premium Approval Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-rose-100 text-gray-700">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Biodata ID</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => {
              const biodataInfo = biodataMap[req.biodataId];
              return (
                <tr key={req._id} className="hover:bg-rose-50">
                  <td className="border border-gray-300 p-2">{biodataInfo?.name || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{req.userEmail}</td>
                  <td className="border border-gray-300 p-2">{biodataInfo?.id || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleMakePremium(req._id)}
                      className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      Make Premium
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedPremium;
