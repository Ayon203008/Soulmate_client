import React, { useEffect, useState } from "react";
import axios from "axios";

const SuccessCounter = () => {
  const [stats, setStats] = useState(null);
  const [animatedCounts, setAnimatedCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    axios
      .get("https://last-try-six-kappa.vercel.app/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  useEffect(() => {
    if (!stats) return;

    const counts = [
      stats.totalBiodata || 0,
      stats.femaleBiodata || 0,
      stats.maleBiodata || 0,
      stats.totalRevenue || 0, // Rename if needed to actual success count
    ];

    const interval = setInterval(() => {
      setAnimatedCounts((prev) =>
        prev.map((val, idx) =>
          val < counts[idx]
            ? Math.min(val + Math.ceil(counts[idx] / 50), counts[idx])
            : val
        )
      );
    }, 50);

    return () => clearInterval(interval);
  }, [stats]);

  if (!stats)
    return (
       <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
      </div>
    );

  const counterData = [
    {
      title: "Total Biodatas",
      count: animatedCounts[0],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Girls' Biodata",
      count: animatedCounts[1],
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Boys' Biodata",
      count: animatedCounts[2],
      color: "from-sky-500 to-indigo-500",
    },
    {
      title: "Successful Marriages",
      count: animatedCounts[3],
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-tr from-rose-50 via-white to-amber-50 rounded-4xl shadow-2xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
          ❤️ Our Success in Numbers
        </h2>
        <p className="text-gray-500 text-lg">
          Trusted by thousands, celebrated by hundreds of couples.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
        {counterData.map((counter, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-xl bg-gradient-to-br ${counter.color} p-6 text-white text-center transition transform hover:scale-105 duration-300`}
          >
            <h3 className="text-5xl font-bold mb-2">{counter.count}+</h3>
            <p className="text-lg font-medium">{counter.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessCounter;
