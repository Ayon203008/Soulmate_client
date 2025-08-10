import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router'; // use react-router-dom, not react-router
import { FaHeart, FaEnvelope, FaPhone } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router';
import useUserRole from "../../Hooks/useUserRole";

const BioDataDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  console.log(user)
const { role, loading: roleLoading } = useUserRole(user?.email);
  const [biodata, setBiodata] = useState(null);
  const [similarBiodatas, setSimilarBiodatas] = useState([]);

  useEffect(() => {
    setBiodata(null);
    axiosSecure.get(`/biodatas/by-custom-id/${id}`)
      .then(res => setBiodata(res.data))
      .catch(err => console.error(err));
  }, [id, axiosSecure]);

  useEffect(() => {
    if (biodata) {
      axiosSecure.get(`/biodatas?type=${biodata.biodataType}`)
        .then(res => {
          const filtered = res.data.filter(b => b._id !== biodata._id).slice(0, 3);
          setSimilarBiodatas(filtered);
        })
        .catch(err => console.error(err));
    }
  }, [biodata, axiosSecure]);

  const handleAddToFavourites = () => {
    if (!user?.email) {
      Swal.fire({
        icon: 'error',
        title: 'Login Required',
        text: 'Please log in to add to favourites.',
      });
      return;
    }

    axiosSecure.post('/favourites', {
      userEmail: user.email,
      biodataId: biodata.id,
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Added to Favourites',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: err.response?.data?.message || 'Something went wrong.',
        });
      });
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${biodata._id}`);
  };

  if (loading || !user || !biodata) {
    return (
      <div className="text-center text-xl py-20 text-gray-600">
      <div className="w-8 h-8 text-center border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Biodata Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-6">
        <img
          src={biodata.profileImage}
          alt={biodata.name}
          className="w-60 h-60 rounded-full object-cover border-4 border-pink-300 mx-auto"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-bold">{biodata.name}</h2>
          <p><strong>ID:</strong> {biodata.id}</p>
          <p><strong>Type:</strong> {biodata.biodataType}</p>
          <p><strong>Date of Birth:</strong> {biodata.dateOfBirth}</p>
          <p><strong>Age:</strong> {biodata.age}</p>
          <p><strong>Height:</strong> {biodata.height}</p>
          <p><strong>Weight:</strong> {biodata.weight}</p>
          <p><strong>Skin Color:</strong> {biodata.race}</p>
          <p><strong>Occupation:</strong> {biodata.occupation}</p>
          <p><strong>Father's Name:</strong> {biodata.fathersName}</p>
          <p><strong>Mother's Name:</strong> {biodata.mothersName}</p>
          <p><strong>Permanent Division:</strong> {biodata.permanentDivision}</p>
          <p><strong>Present Division:</strong> {biodata.presentDivision}</p>
          <p><strong>Expected Partner Age:</strong> {biodata.expectedPartnerAge}</p>
          <p><strong>Expected Partner Height:</strong> {biodata.expectedPartnerHeight}</p>
          <p><strong>Expected Partner Weight:</strong> {biodata.expectedPartnerWeight}</p>

          {role === 'premiumUser' ? (
            <div className="mt-4 bg-green-50 p-4 rounded-md">
              <p className="flex items-center gap-2 text-green-600">
                <FaEnvelope /> {biodata.email}
              </p>
              <p className="flex items-center gap-2 text-green-600">
                <FaPhone /> {biodata.mobileNumber}
              </p>
            </div>
          ) : (
            <div className="mt-6">
              <button
                onClick={handleRequestContact}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full"
              >
                Request Contact Info
              </button>
            </div>
          )}

          <button
            onClick={handleAddToFavourites}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-rose-400 text-rose-500 rounded-full hover:bg-rose-100"
          >
            <FaHeart /> Add to Favourites
          </button>
        </div>
      </div>

      {/* Similar Biodatas */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Similar Biodatas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {similarBiodatas.map(bio => (
            <div key={bio._id} className="bg-white shadow rounded-xl p-4">
              <img
                src={bio.profileImage}
                alt={bio.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border mb-3"
              />
              <h4 className="text-center font-semibold">{bio.name}</h4>
              <p className="text-center text-sm text-gray-600">
                {bio.biodataType}, {bio.age} yrs
              </p>
              <Link
                to={`/biodata/${bio.id}`}
                className="block text-center mt-2 text-indigo-500 hover:underline"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BioDataDetails;
