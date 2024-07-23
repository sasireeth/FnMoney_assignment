import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

const LandingPage = () => {
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:9000/api/assessments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssessments(response.data);
      } catch (error) {
        setError(error.response?.data?.msg || 'Failed to fetch assessments');
      }
    };

    fetchAssessments();
  }, [assessments]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:9000/api/assessments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssessments(assessments.filter((assessment) => assessment._id !== id));
      console.log(assessments);
    } catch (error) {
      setError(error.response?.data?.msg || 'Failed to delete assessment');
    }
  };

  const openUpdateModal = (assessment) => {
    setSelectedAssessment(assessment);
    setModalOpen(true);
  };

  const closeUpdateModal = () => {
    setModalOpen(false);
    setSelectedAssessment(null);
  };

  const handleUpdate = async (updatedAssessment) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:9000/api/assessments/${selectedAssessment._id}`,
        updatedAssessment,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssessments(
        assessments.map((assessment) =>
          assessment._id === selectedAssessment._id ? updatedAssessment : assessment
        )
      );
      closeUpdateModal();
    } catch (error) {
      setError(error.response?.data?.msg || 'Failed to update assessment');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Assessments</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((assessment) => (
            <tr key={assessment._id}>
              <td className="border px-4 py-2">{assessment.title}</td>
              <td className="border px-4 py-2">{assessment.description}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => openUpdateModal(assessment)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(assessment._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalOpen} onClose={closeUpdateModal}>
        <h2 className="text-2xl font-bold mb-4">Update Assessment</h2>
        {selectedAssessment && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate({
                title: e.target.title.value,
                description: e.target.description.value,
              });
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Title:</label>
              <input
                type="text"
                name="title"
                defaultValue={selectedAssessment.title}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <textarea
                name="description"
                defaultValue={selectedAssessment.description}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 w-full rounded"
            >
              Update
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default LandingPage;
