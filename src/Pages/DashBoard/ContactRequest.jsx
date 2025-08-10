import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../Context/AuthContext';

const ContactRequest = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get(`/contact-requests?userEmail=${user?.email}`);
        const enriched = await Promise.all(
          res.data.map(async (req) => {
            try {
              const bioRes = await axiosSecure.get(`/biodatas/${req.biodataId}`);
              const biodata = bioRes.data;

              return {
                ...req,
                name: biodata.name,
                biodataNumberId: biodata.id,
                mobile: req.status === 'approved' ? biodata.mobileNumber : 'Hidden',
                email: req.status === 'approved' ? biodata.email : 'Hidden',
              };
            } catch {
              return {
                ...req,
                name: 'Unknown',
                biodataNumberId: 'N/A',
                mobile: 'Hidden',
                email: 'Hidden',
              };
            }
          })
        );
        setRequests(enriched);
      } catch (error) {
        Swal.fire('Error', 'Failed to load contact requests.', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchRequests();
  }, [axiosSecure, user?.email, refresh]);

  useEffect(() => {
    const handleUpdate = () => setRefresh((prev) => prev + 1);
    window.addEventListener('contactRequestUpdated', handleUpdate);
    return () => window.removeEventListener('contactRequestUpdated', handleUpdate);
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This request will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/contact-requests/${id}`);
      if (res.data?.success) {
        Swal.fire('Deleted!', res.data.message, 'success');
        // UI থেকে ডিলিটেড রিকোয়েস্ট সরানো
        setRequests((prev) => prev.filter((r) => r._id !== id));
      } else {
        Swal.fire('Failed', res.data.message || 'Failed to delete request.', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to delete request.', 'error');
    }
  };

  if (loading) return (
     <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
      </div>
  );
  if (requests.length === 0) return <p className="text-center mt-10">No contact requests found.</p>;

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Contact Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Biodata ID</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Mobile</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="text-center">
                <td className="py-2 px-4 border">{req.name}</td>
                <td className="py-2 px-4 border">{req.biodataNumberId}</td>
                <td className="py-2 px-4 border">
                  {req.status ? req.status.charAt(0).toUpperCase() + req.status.slice(1) : 'Pending'}
                </td>
                <td className="py-2 px-4 border">{req.email}</td>
                <td className="py-2 px-4 border">{req.mobile}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactRequest;
