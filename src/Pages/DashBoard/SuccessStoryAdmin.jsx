import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const SuccessStoryAdmin = () => {
  const axiosSecure = UseAxiosSecure();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get('/success-stories')
      .then(res => {
        setStories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-pink-500 text-2xl"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-white">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">Success Story Admin</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl shadow-md">
          <thead>
            <tr className="bg-pink-100 text-pink-700 text-left">
              <th className="py-3 px-4 border-b">Male Biodata ID</th>
              <th className="py-3 px-4 border-b">Female Biodata ID</th>
              <th className="py-3 px-4 border-b">Marriage Date</th>
              <th className="py-3 px-4 border-b">View Story</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story, index) => (
              <tr key={index} className="hover:bg-pink-50">
                <td className="py-3 px-4 border-b">{story.selfId}</td>
                <td className="py-3 px-4 border-b">{story.partnerId}</td>
                <td className="py-3 px-4 border-b">
                  {new Date(story.marriageDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: `Story of ${story.selfId} & ${story.partnerId}`,
                        text: story.story,
                        imageUrl: story.image,
                        imageWidth: 400,
                        imageHeight: 300,
                        imageAlt: 'Couple Image',
                        confirmButtonColor: '#ec4899'
                      });
                    }}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
                  >
                    View Story
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

export default SuccessStoryAdmin;
