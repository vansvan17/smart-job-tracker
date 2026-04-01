import { useContext, useState } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import useDebounce from '../hooks/useDebounce';
import { motion } from 'framer-motion';

export default function Applications() {
  const { jobs, loading, deleteJob } = useContext(ApplicationContext);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const filteredJobs = jobs.filter(job => 
    job.company.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    job.role.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (loading) return <div className="text-center mt-20 text-gray-500 font-medium">Loading your pipeline...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Applications</h1>
        <input 
          type="text" 
          placeholder="Search company or role..." 
          className="p-2 border border-gray-300 rounded-md shadow-sm w-72 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500 col-span-full">No applications match your search.</p>
        ) : (
          filteredJobs.map(job => (
            <div key={job.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={`https://logo.clearbit.com/${job.company.replace(/\s+/g, '').toLowerCase()}.com`} 
                  onError={(e) => e.target.style.display = 'none'}
                  alt="logo" 
                  className="w-10 h-10 rounded border border-gray-100 object-cover"
                />
                <h2 className="font-semibold text-lg text-gray-800">{job.company}</h2>
              </div>
              <p className="text-gray-600 font-medium">{job.role}</p>
              <div className="flex justify-between items-center mt-3">
                 <span className={`px-2 py-1 rounded text-xs font-bold ${
                    job.status === 'Offer' ? 'bg-green-100 text-green-700' :
                    job.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                 }`}>
                    {job.status}
                 </span>
                 <p className="text-xs text-gray-400">Applied: {job.appliedDate}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50 flex gap-4">
                <button className="text-blue-500 text-sm font-medium hover:text-blue-700">Edit</button>
                <button onClick={() => deleteJob(job.id)} className="text-red-500 text-sm font-medium hover:text-red-700">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}