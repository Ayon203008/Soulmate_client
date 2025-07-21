import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../Context/AuthContext';

const ViewBioData = () => {
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [premiumRequestSent, setPremiumRequestSent] = useState(false);

  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/biodata/user/${user.email}`)
        .then((res) => {
          setBiodata(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  const handleMakePremiumRequest = async () => {
    if (!biodata) return;

    try {
      const res = await axiosSecure.post('/premium-request', {
        biodataId: biodata.id,
        userEmail: user.email,
      });

  
      if (res.data.insertedId || res.data.success || res.data.message === 'Already requested') {
        setPremiumRequestSent(true);
        await Swal.fire({
          icon: 'success',
          title: 'Request Sent!',
          text: 'Premium request sent for approval.',
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        throw new Error('Failed to send request');
      }
    } catch (err) {
      console.error(err);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send premium request.',
      });
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading your biodata...</p>;
  if (!biodata)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        No biodata found for your account.
      </p>
    );

  const isPremiumUser = biodata.role === 'premiumUser';

  return (
    <section className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-pink-50 via-rose-50 to-yellow-50 rounded-3xl shadow-xl mt-10 border border-rose-300">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-rose-700 tracking-wide drop-shadow-md">
        Your Premium Biodata Details
      </h2>

      {/* Premium Badge or Request Button */}
      {isPremiumUser ? (
        <div className="mb-6 text-center text-green-600 font-bold text-lg">
          🌟 You are now PREMIUM
        </div>
      ) : (
        <div className="mb-6 text-center">
          <button
            onClick={handleMakePremiumRequest}
            className={`px-6 py-2 rounded-full font-semibold shadow-md transition
              ${premiumRequestSent ? 'bg-yellow-400 text-yellow-900 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600 text-white'}`}
            disabled={premiumRequestSent}
          >
            {premiumRequestSent ? 'Premium request pending approval' : 'Make Biodata Premium'}
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          {biodata.profileImage ? (
            <img
              src={biodata.profileImage}
              alt="Profile"
              className="w-48 h-48 rounded-3xl object-cover shadow-2xl border-4 border-rose-300 hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-48 h-48 rounded-3xl bg-gray-200 flex items-center justify-center text-gray-400 font-semibold text-lg">
              No Image
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 font-medium">
          <div>
            <span className="font-semibold text-rose-600">Biodata ID:</span> {biodata.id}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Type:</span> {biodata.biodataType}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Name:</span> {biodata.name}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Date of Birth:</span> {biodata.dateOfBirth}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Age:</span> {biodata.age}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Height:</span> {biodata.height}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Weight:</span> {biodata.weight}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Occupation:</span> {biodata.occupation}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Race:</span> {biodata.race}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Father's Name:</span> {biodata.fathersName}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Mother's Name:</span> {biodata.mothersName}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Permanent Division:</span>{' '}
            {biodata.permanentDivision}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Present Division:</span>{' '}
            {biodata.presentDivision}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Expected Partner Age:</span>{' '}
            {biodata.expectedPartnerAge}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Expected Partner Height:</span>{' '}
            {biodata.expectedPartnerHeight}
          </div>
          <div>
            <span className="font-semibold text-rose-600">Expected Partner Weight:</span>{' '}
            {biodata.expectedPartnerWeight}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewBioData;
