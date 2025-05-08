import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentsList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');
  const studentsPerPage = 20;


  const BASE_URL = `http://${import.meta.env.VITE_DEV_IP}:${import.meta.env.VITE_DEV_PORT}`;


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/students?page=${currentPage}&limit=${studentsPerPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        );

        const total = res.headers.get("TotalCount");
        console.log(total)
        if (total) {
          setTotalCount(parseInt(total, 24));
        }

        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    fetchStudents();
  }, [currentPage, sortBy, sortOrder]);

  const totalPages = Math.ceil(totalCount / studentsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="p-6 ml-64">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">View All Students</h2>
        <button
          onClick={() => navigate('/students/new')}
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
        >
           Add New Students
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-md">
        <table className="min-w-full bg-white text-sm text-slate-700">
          <thead className="bg-blue-900 text-white">
            <tr className="text-left text-xs font-semibold uppercase">
              <th className="px-4 py-3 text-center cursor-pointer" onClick={() => handleSort('firstName')}>
                S.N.
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('firstName')}>
                Student Name
                {sortBy === 'firstName' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('courseCenter')}>
                Course Center
                {sortBy === 'courseCenter' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('teacher')}>
                Teacher's Name
                {sortBy === 'teacher' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
              </th>
              <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('phone')}>
                Phone Number
                {sortBy === 'phone' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
              </th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center px-4 py-6 text-slate-500">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={student.id} className="hover:bg-slate-100">
                  <td className="px-4 py-3 text-center font-medium">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">
                    {`${student.firstname || ''} ${student.middlename || ''} ${student.lastname || ''}`}
                  </td>
                  <td className="px-4 py-3">{student.coursecenter || '-'}</td>
                  <td className="px-4 py-3">{student.teacher || '-'}</td>
                  <td className="px-4 py-3">{student.phone || '-'}</td>
                  <td className="px-4 py-3 text-center">...</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end space-x-2 text-sm">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => paginate(pageNum)}
            className={`px-3 py-1 border rounded ${
              pageNum === currentPage
                ? 'bg-blue-800 text-white border-blue-800'
                : 'hover:bg-slate-100'
            }`}
          >
            {pageNum}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentsList;
