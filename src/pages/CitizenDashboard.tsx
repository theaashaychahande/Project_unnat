import React, { useState } from 'react';

const CitizenDashboard: React.FC = () => {
  const [complaints, setComplaints] = useState([
    // Example complaints
    { title: 'Pothole on Main Street', date: '2026-03-10', urgency: 'High', status: 'Pending' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add a new complaint
  };

  return (
    <div className="min-h-screen bg-navy text-white">
      <nav className="bg-orange p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Citizen Dashboard</h1>
        <button className="bg-white text-navy px-4 py-2 rounded">Logout</button>
      </nav>

      <main className="p-4">
        <form onSubmit={handleSubmit} className="bg-white text-navy p-4 rounded shadow-md mb-4">
          <h2 className="text-lg font-bold mb-4">Submit a Complaint</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Complaint Title</label>
            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Details / Description</label>
            <textarea className="w-full border border-gray-300 rounded px-3 py-2" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Location</label>
            <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Urgency Level</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input type="file" className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-orange text-white px-4 py-2 rounded hover:bg-orange-600">
            Submit
          </button>
        </form>

        <h2 className="text-lg font-bold mb-4">Your Complaints</h2>
        <div className="space-y-4">
          {complaints.map((complaint, index) => (
            <div key={index} className="bg-white text-navy p-4 rounded shadow-md">
              <h3 className="text-lg font-bold">{complaint.title}</h3>
              <p className="text-sm">Date: {complaint.date}</p>
              <p className="text-sm">Urgency: <span className={`font-bold ${complaint.urgency === 'Low' ? 'text-green-500' : complaint.urgency === 'Medium' ? 'text-yellow-500' : complaint.urgency === 'High' ? 'text-orange-500' : 'text-red-500'}`}>{complaint.urgency}</span></p>
              <p className="text-sm">Status: <span className={`font-bold ${complaint.status === 'Pending' ? 'text-yellow-500' : complaint.status === 'In Progress' ? 'text-blue-500' : 'text-green-500'}`}>{complaint.status}</span></p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;