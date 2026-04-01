import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [jobs, setJobs] = useLocalStorage('job-tracker-data', []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (jobs.length === 0) {
      setLoading(true);
      // Fetching dummy data to initialize app state
      axios.get('https://dummyjson.com/products?limit=6')
        .then(res => {
          const dummyJobs = res.data.products.map(p => ({
            id: p.id.toString(),
            company: p.brand || 'Tech Corp',
            role: p.title,
            location: 'Remote',
            salary: p.price * 1000,
            platform: 'LinkedIn',
            status: 'Applied',
            appliedDate: new Date().toISOString().split('T')[0],
            notes: p.description,
            bookmarked: false
          }));
          setJobs(dummyJobs);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const addJob = (job) => setJobs([{ ...job, id: Date.now().toString() }, ...jobs]);
  const deleteJob = (id) => setJobs(jobs.filter(j => j.id !== id));
  
  return (
    <ApplicationContext.Provider value={{ jobs, loading, addJob, deleteJob }}>
      {children}
    </ApplicationContext.Provider>
  );
};