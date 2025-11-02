import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HabitModal from '../components/HabitModal';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    if (!token || !userData) {
      navigate('/login');
      return;
    }
    try {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      loadHabits(userObj.userId);
    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);

  const loadHabits = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/habits/user/${userId}`);
      const result = await res.json();
      if (result.success) setHabits(result.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHabitCreated = () => {
    if (user) loadHabits(user.userId);
    setShowModal(false);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between mb-4">
        <h1>Welcome, {user?.name || 'User'}!</h1>
        <button onClick={() => { localStorage.clear(); navigate('/'); }} className="btn btn-outline-danger">Logout</button>
      </div>
      <button className="btn btn-primary mb-4" onClick={() => setShowModal(true)}>+ Add Habit</button>
      {loading ? (
        <p>Loading...</p>
      ) : habits.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <h3>No habits yet</h3>
            <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>Create Habit</button>
          </div>
        </div>
      ) : (
        <div className="row g-3">
          {habits.map((h) => (
            <div key={h._id} className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5>{h.name}</h5>
                  <p>{h.description}</p>
                  <Link to={`/edit-habit/${h._id}`} className="btn btn-sm btn-primary">Edit</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <HabitModal show={showModal} onClose={() => setShowModal(false)} onSuccess={handleHabitCreated} />
    </div>
  );
}

export default Dashboard;

