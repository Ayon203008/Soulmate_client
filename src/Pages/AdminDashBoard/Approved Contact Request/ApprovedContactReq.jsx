import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const ApprovedContactReq = () => {
  const axiosSecure = UseAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  axiosSecure.get('/contact-requests/all')
    .then(async res => {
      // শুধু status approved না এমন গুলো রাখো
      const filtered = res.data.filter(req => req.status !== 'approved');

      const enrichedRequests = await Promise.all(
        filtered.map(async (req) => {
          try {
            const { data: biodata } = await axiosSecure.get(`/biodatas/${req.biodataId}`);
            return {
              ...req,
              biodataName: biodata?.name || 'N/A',
              numericId: biodata?.id || 'N/A',
            };
          } catch (err) {
            return { ...req, biodataName: 'N/A', numericId: 'N/A' };
          }
        })
      );
      setRequests(enrichedRequests);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
}, [axiosSecure]);

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/contact-requests/${id}`, { approve: true });
      if (res.data.success) {
        Swal.fire('Approved!', 'Contact request approved successfully.', 'success');

        // Approve হওয়ার পর লিস্ট থেকে রিমুভ করা
        setRequests(prev => prev.filter(r => r._id !== id));

        // অন্য কম্পোনেন্টকে জানানো
        window.dispatchEvent(new Event('contactRequestUpdated'));
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Biodata ID</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id} className="text-center">
                <td className="border px-4 py-2">{req.biodataName}</td>
                <td className="border px-4 py-2">{req.userEmail}</td>
                <td className="border px-4 py-2">{req.numericId}</td>
                <td className="border px-4 py-2">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleApprove(req._id)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No contact requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedContactReq;
