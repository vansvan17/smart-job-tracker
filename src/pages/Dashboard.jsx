import { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { jobs } = useContext(ApplicationContext);
  
  const stats = {
    total: jobs.length,
    interviewing: jobs.filter(j => j.status === 'Interviewing').length,
    offers: jobs.filter(j => j.status === 'Offer').length,
    rejected: jobs.filter(j => j.status === 'Rejected').length,
  };

  const pieData = [
    { name: 'Applied', value: stats.total - stats.interviewing - stats.offers - stats.rejected },
    { name: 'Interviewing', value: stats.interviewing },
    { name: 'Offer', value: stats.offers },
    { name: 'Rejected', value: stats.rejected }
  ];

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#EF4444'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, val]) => (
          <div key={key} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
            <h3 className="text-gray-500 uppercase text-xs font-bold tracking-wider">{key}</h3>
            <p className="text-3xl font-black text-gray-800 mt-1">{val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Pipeline Breakdown</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}