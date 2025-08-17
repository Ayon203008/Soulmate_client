import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [premiumRequestedIds, setPremiumRequestedIds] = useState([]);

  const fetchPremiumRequests = async () => {
    try {
      const res = await axiosSecure.get('/premium-requests');
      const ids = res.data.map(req => req.biodataId);
      setPremiumRequestedIds(ids);
    } catch (err) {
      console.error('Failed to fetch premium requests:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get(`/allBiodatas?search=${search}`);
      setUsers(res.data.biodatas || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPremiumRequests();
  }, [search]);

  const makeAdmin = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to make this user an admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make admin!'
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/admin/${id}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire('Success', 'User is now an Admin!', 'success');
          fetchUsers();
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to make admin.', 'error');
      }
    }
  };

  const makePremium = async (mongoId, numericId) => {
    if (!premiumRequestedIds.includes(numericId)) {
      Swal.fire('Denied', 'This user did not request premium access.', 'warning');
      return;
    }

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to make this user a premium user?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make premium!'
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/premium/${mongoId}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire('Success', 'User is now a Premium User!', 'success');
          fetchUsers();
          fetchPremiumRequests();
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to make premium user.', 'error');
      }
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center md:text-left">Manage Users</h2>

      <input
        type="text"
        placeholder="Search by name..."
        className="border border-gray-300 p-2 rounded mb-4 md:mb-6 w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="table-auto w-full min-w-[600px] md:min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-2 md:px-4 py-2 text-sm md:text-base">#</th>
              <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Name</th>
              <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Email</th>
              <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Premium</th>
              <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Admin</th>
              <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Make Admin</th>
              <th className="border px-2 md:px-4 py-2 text-sm md:text-base">Make Premium</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((user, index) => {
              const showPremiumButton =
                user.role !== 'premiumUser' && premiumRequestedIds.includes(user.id);

              return (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border px-2 md:px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-2 md:px-4 py-2">{user.name || 'N/A'}</td>
                  <td className="border px-2 md:px-4 py-2">{user.email || 'N/A'}</td>
                  <td className="border px-2 md:px-4 py-2 text-center">
                    {user.role === 'premiumUser' ? '✅ Yes' : '❌ No'}
                  </td>
                  <td className="border px-2 md:px-4 py-2 text-center">
                    {user.isAdmin ? '🛡️ Admin' : '❌ No'}
                  </td>
                  <td className="border px-2 md:px-4 py-2 text-center">
                    {!user.isAdmin && (
                      <button
                        onClick={() => makeAdmin(user._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td className="border px-2 md:px-4 py-2 text-center">
                    {showPremiumButton && (
                      <button
                        onClick={() => makePremium(user._id, user.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm"
                      >
                        Make Premium
                      </button>
                    )}
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

export default ManageUsers;
