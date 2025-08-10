import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { Link } from 'react-router';
import { FaHeart, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const FavouriteBioData = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavourites = () => {
    if (user?.email) {
      setLoading(true);
      axiosSecure.get(`/favourites/${user.email}`)
        .then((res) => {
          setFavourites(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load favourites:', err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [user?.email]);

  const handleDelete = (favouriteId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Remove this biodata from your favourites?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/favourites/${favouriteId}`)
          .then(() => {
            Swal.fire('Deleted!', 'The biodata has been removed.', 'success');
            fetchFavourites();
          })
          .catch((error) => {
            console.error("Failed to delete favourite:", error);
            Swal.fire('Error!', 'Failed to delete favourite.', 'error');
          });
      }
    });
  };

  if (loading) {
    return (
       <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (favourites.length === 0) {
    return <p className="text-center mt-10 text-gray-600">You have no favourite biodatas yet.</p>;
  }
  
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-rose-600 text-center mb-10 flex items-center justify-center gap-3">
        <FaHeart className="text-rose-400" size={30} /> Your Favourite Biodatas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {favourites.map(fav => {
          const bio = fav.biodata || fav; // আপনার API রেসপন্স অনুযায়ী
          return (
            <div
              key={fav._id}
              className="bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-32 h-32 mb-5 rounded-full overflow-hidden border-4 border-rose-300 shadow-md">
                <img
                  src={bio.profileImage || 'https://i.ibb.co/0jqHpnp/avatar.png'}
                  alt={bio.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="text-2xl font-semibold text-rose-600 mb-2">{bio.name}</h3>
              <p className="text-gray-700 mb-1"><strong>Biodata ID:</strong> {bio.id}</p>
              <p className="text-gray-700 mb-1"><strong>Age:</strong> {bio.age}</p>
              <p className="text-gray-700 mb-1"><strong>Division:</strong> {bio.presentDivision}</p>
              <p className="text-gray-700 mb-1"><strong>Occupation:</strong> {bio.occupation}</p>
              <p className="text-gray-700 mb-3"><strong>Type:</strong> {bio.biodataType}</p>

              <div className="flex gap-3 mt-4">
                <Link
                  to={`/biodata/${bio.id}`}
                  className="px-4 py-2 text-white bg-rose-500 rounded-full font-semibold hover:bg-rose-600 transition"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => handleDelete(fav._id)}
                  className="px-3 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FavouriteBioData;
