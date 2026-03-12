import React, { useState } from 'react';

const AdminDashboard: React.FC = () => {
  const [complaints, setComplaints] = useState([
    { userName: 'John Doe', title: 'Pothole on Main Street', location: 'Main Street', urgency: 'High', date: '2026-03-10', status: 'Pending' },
  ]);
  const [filters, setFilters] = useState({ urgency: '', status: '' });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredComplaints = complaints.filter(
    (complaint) =>
      (filters.urgency === '' || complaint.urgency === filters.urgency) &&
      (filters.status === '' || complaint.status === filters.status)
  );

  return (
    <div className="min-h-screen bg-navy text-white flex">
      <aside className="w-64 bg-orange p-4">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <nav className="space-y-2">
          <button className="block w-full text-left px-4 py-2 bg-white text-navy rounded">Overview</button>
          <button className="block w-full text-left px-4 py-2 bg-white text-navy rounded">Complaints Queue</button>
        </nav>
      </aside>

      <main className="flex-1 p-4">
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white text-navy p-4 rounded shadow-md">
              <h3 className="text-sm font-bold">Total Users Registered</h3>
              <p className="text-xl font-bold">100</p>
            </div>
            <div className="bg-white text-navy p-4 rounded shadow-md">
              <h3 className="text-sm font-bold">Total Complaints Submitted</h3>
              <p className="text-xl font-bold">50</p>
            </div>
            <div className="bg-white text-navy p-4 rounded shadow-md">
              <h3 className="text-sm font-bold">Complaints by Urgency</h3>
              <p className="text-sm">High: 10, Medium: 20, Low: 20</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">Complaints Queue</h2>
          <div className="flex space-x-4 mb-4">
            <select
              name="urgency"
              value={filters.urgency}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All Urgency Levels</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <table className="w-full bg-white text-navy rounded shadow-md">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">User Name</th>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Location</th>
                <th className="text-left px-4 py-2">Urgency</th>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{complaint.userName}</td>
                  <td className="px-4 py-2">{complaint.title}</td>
                  <td className="px-4 py-2">{complaint.location}</td>
                  <td className="px-4 py-2">{complaint.urgency}</td>
                  <td className="px-4 py-2">{complaint.date}</td>
                  <td className="px-4 py-2">{complaint.status}</td>
                  <td className="px-4 py-2">
                    <button className="bg-orange text-white px-2 py-1 rounded">Update Status</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;