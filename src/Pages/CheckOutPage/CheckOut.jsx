import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router';  // react-router-dom থেকে import করো
import { AuthContext } from '../../Context/AuthContext';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const CHARGE_AMOUNT = 5; // ডাইনামিক চার্জ এখানে রাখা হয়েছে

const Checkout = () => {
  const { biodataId } = useParams();  // URL থেকে MongoDB _id পাওয়া যায়
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [simpleId, setSimpleId] = useState('');
  const [biodataDetails, setBiodataDetails] = useState(null);

  useEffect(() => {
    const fetchBiodata = async () => {
      if (!biodataId) return;
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/biodatas/${biodataId}`);
        if (res.data) {
          setBiodataDetails(res.data);
          if (res.data.id) {
            setSimpleId(res.data.id);
          } else {
            Swal.fire('Warning', 'Biodata numeric ID not found. Using MongoDB ID instead.', 'warning');
            setSimpleId(biodataId);
          }
        } else {
          Swal.fire('Not Found', 'The requested biodata was not found.', 'error');
        }
      } catch (error) {
        console.error('Error fetching biodata:', error);
        Swal.fire('Error', error.response?.data?.error || 'Failed to fetch biodata information.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchBiodata();
  }, [biodataId, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardNumber || cardNumber.length < 12) {
      Swal.fire('Invalid Card', 'Please enter a valid card number.', 'error');
      return;
    }

    if (!user?.email) {
      Swal.fire('Not Logged In', 'You must be logged in to make a request.', 'error');
      return;
    }

    if (!biodataDetails) {
      Swal.fire('Error', 'Biodata is not loaded. Please try again.', 'error');
      return;
    }

    setLoading(true);

    try {
      // এখানে তোমার পেমেন্ট প্রসেস করার কোড থাকবে (simulate করছি)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // পেমেন্ট সফল হলে সার্ভারে রিকোয়েস্ট পাঠাও
      const response = await axiosSecure.post('/contact-requests', {
        biodataId: biodataId,
        userEmail: user.email,
        paymentAmount: CHARGE_AMOUNT,  // ডাইনামিক চার্জ পাঠানো হচ্ছে
      });

      if (response.data?.success) {
        Swal.fire('Success', 'Your request has been submitted successfully.', 'success');
        setCardNumber('');
      } else {
        Swal.fire('Error', response.data.message || 'Failed to submit request.', 'error');
      }
    } catch (error) {
      console.error('Contact request error:', error);
      Swal.fire('Error', error.response?.data?.message || 'Server error occurred.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !biodataDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-2">Loading biodata...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Request Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <p className="text-sm text-gray-600 mb-4 font-medium">
          Charge: <span className="text-indigo-600 font-bold">${CHARGE_AMOUNT} USD</span> (One-time request)
        </p>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Biodata ID</label>
          <input
            type="text"
            value={simpleId || 'Loading...'}
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Your Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Card Number</label>
          <input
            type="text"
            placeholder="Enter your card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            maxLength={16}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !biodataDetails}
          className={`w-full py-3 text-white font-semibold rounded-md ${
            loading || !biodataDetails ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
