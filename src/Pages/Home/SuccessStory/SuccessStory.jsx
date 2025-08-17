import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuccessStory = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    axios.get('https://last-try-six-kappa.vercel.app/success-stories')
      .then(res => {
        const sortedStories = res.data.sort((a, b) => new Date(b.marriageDate) - new Date(a.marriageDate));
        setStories(sortedStories);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load success stories.');
        setLoading(false);
      });
  }, []);

    if (loading) {
    return (
      <div className="flex  justify-center min-h-screen">
        <span className="loading loading-ball loading-xs"></span>
<span className="loading loading-ball loading-sm"></span>
<span className="loading loading-ball loading-md"></span>
<span className="loading loading-ball loading-lg"></span>
<span className="loading loading-ball loading-xl"></span>
      </div>
    );
  }
  if (error) return <div className="text-center py-20 text-red-500 font-semibold text-xl">{error}</div>;

  return (
    <section  className="w-full bg-gradient-to-br from-rose-50 via-pink-100 to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-pink-600 mb-16 drop-shadow-md">
          💖 Our Lovely Success Stories
        </h2>

        {stories.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No stories found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {stories.map(({ _id, selfId, partnerId, image, story, rating, marriageDate }) => (
              <div
                key={_id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 flex flex-col border border-pink-100"
              >
                <div className="w-full flex justify-center -mt-16 mb-4">
                  <img
                    src={image}
                    alt={`Couple ${selfId} & ${partnerId}`}
                    className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>

                <p className="text-gray-800 text-sm mb-2 text-center">
                  <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">
                    Married on {new Date(marriageDate).toLocaleDateString()}
                  </span>
                </p>

                <p className="text-gray-700 italic text-base leading-relaxed mb-4 text-center">
                  "{story.length > 180 ? story.slice(0, 180) + '...' : story}"
                </p>

                <div className="mt-auto text-center">
                  <p className="font-bold text-pink-700 text-lg">
                    Biodata IDs: <span className="text-gray-900">{selfId} & {partnerId}</span>
                  </p>

                  <div className="flex justify-center mt-2 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl transition-transform duration-200 ${
                          i < rating ? 'text-yellow-400' : 'text-gray-300'
                        } hover:scale-125`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStory;
