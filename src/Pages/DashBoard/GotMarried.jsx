import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../Context/AuthContext';

const GotMarried = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    selfId: '',
    partnerId: '',
    image: '',
    story: '',
    rating: 0,
    marriageDate: '', // ✅ marriage date field added
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { selfId, rating } = formData;

    try {
      // 1. Save success story
      const response = await axiosSecure.post('/success-stories', formData);

      if (response.data.insertedId) {
        // 2. Save rating
        await axiosSecure.post('/ratings', {
          biodataId: Number(selfId),
          userEmail: user?.email || "unknown@user.com",
          stars: Number(rating),
        });

        Swal.fire('Success', 'Your story has been submitted!', 'success');
        setFormData({
          selfId: '',
          partnerId: '',
          image: '',
          story: '',
          rating: 0,
          marriageDate: '', // ✅ reset date field
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-pink-50 to-yellow-50 px-4 py-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-pink-600 text-center">
          Share Your Love Story
        </h2>

        <div>
          <label className="block font-semibold mb-1">Your Biodata ID</label>
          <input
            type="number"
            name="selfId"
            required
            value={formData.selfId}
            onChange={handleChange}
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Partner Biodata ID</label>
          <input
            type="number"
            name="partnerId"
            required
            value={formData.partnerId}
            onChange={handleChange}
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Couple Image URL</label>
          <input
            type="url"
            name="image"
            required
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Marriage Date</label>
          <input
            type="date"
            name="marriageDate"
            required
            value={formData.marriageDate}
            onChange={handleChange}
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Your Story</label>
          <textarea
            name="story"
            required
            rows="5"
            value={formData.story}
            onChange={handleChange}
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Rate Your Experience</label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                className={`text-3xl cursor-pointer transition ${
                  formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition"
        >
          Submit Success Story
        </button>
      </form>
    </section>
  );
};

export default GotMarried;
