import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const schema = yup.object({
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Role is required'),
  status: yup.string().required('Status is required'),
  appliedDate: yup.string().required('Applied date is required')
}).required();

export default function AddApplication() {
  const { addJob } = useContext(ApplicationContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    addJob({ ...data, bookmarked: false });
    toast.success('Application added successfully!');
    navigate('/applications');
  };

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Application</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input {...register("company")} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          <p className="text-red-500 text-xs mt-1">{errors.company?.message}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <input {...register("role")} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
          <p className="text-red-500 text-xs mt-1">{errors.role?.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select {...register("status")} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer Received</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Applied Date</label>
            <input type="date" {...register("appliedDate")} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            <p className="text-red-500 text-xs mt-1">{errors.appliedDate?.message}</p>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md font-medium hover:bg-blue-700 transition mt-4">
          Save Application
        </button>
      </form>
    </motion.div>
  );
}