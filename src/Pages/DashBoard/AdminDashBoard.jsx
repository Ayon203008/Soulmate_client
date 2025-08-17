import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28'];

const AdminDashBoard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://last-try-six-kappa.vercel.app/admin/stats')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
      })
      .then(data => {
        setStats(data);
        setLoading(false);
        console.log("Dashboard stats received:", data);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className='flex justify-center'><span className="loading loading-ball loading-xs"></span>
<span className="loading loading-ball loading-sm"></span>
<span className="loading loading-ball loading-md"></span>
<span className="loading loading-ball loading-lg"></span>
<span className="loading loading-ball loading-xl"></span></div>;
  if (error) return <div style={{ ...styles.centerText, color: 'red' }}>Error: {error}</div>;

  // Pie chart data
  const data = [
    { name: 'Total Biodata', value: stats.totalBiodata },
    { name: 'Male Biodata', value: stats.maleBiodata },
    { name: 'Female Biodata', value: stats.femaleBiodata },
    { name: 'Premium Biodata', value: stats.premiumBiodata },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Admin Dashboard Overview</h2>

      <div style={styles.grid}>
        <div style={styles.chartCard}>
          <h3 style={styles.cardTitle}>Biodata Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => value.toLocaleString()} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.statsCard}>
          <h3 style={styles.cardTitle}>📈 Summary Stats</h3>
          <ul style={styles.statList}>
            <li><span>Total Biodatas:</span> <strong>{stats.totalBiodata.toLocaleString()}</strong></li>
            <li><span>Male Biodatas:</span> <strong>{stats.maleBiodata.toLocaleString()}</strong></li>
            <li><span>Female Biodatas:</span> <strong>{stats.femaleBiodata.toLocaleString()}</strong></li>
            <li><span>Premium Biodatas:</span> <strong>{stats.premiumBiodata.toLocaleString()}</strong></li>
            <li style={styles.revenue}>
              <span>Total Revenue:</span> <strong>{(stats.totalPaymentReceived || 0).toLocaleString()} USD</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f6f9fc',
    borderRadius: '12px'
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '30px',
    color: '#333'
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '30px',
    justifyContent: 'center'
  },
  chartCard: {
    flex: '1 1 400px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  statsCard: {
    flex: '1 1 350px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    color: '#0066cc'
  },
  statList: {
    listStyle: 'none',
    padding: 0,
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  revenue: {
    marginTop: '15px',
    fontSize: '17px',
    fontWeight: 'bold',
    color: '#28a745',
    borderTop: '1px dashed #ccc',
    paddingTop: '10px'
  },
  centerText: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px'
  },
};

export default AdminDashBoard;
