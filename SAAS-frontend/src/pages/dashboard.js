import React, { useState, useEffect } from "react";
import "../styles/buttons.css";
import HabitModal from "../components/HabitModal";
import { PencilSquare, PersonCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [showHabitModal, setShowHabitModal] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    // Verify token is still valid
    fetch('http://localhost:5000/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          navigate('/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };
  const habits = [
    { id: "h1", name: "Morning Meditation", streak: "🔥 7" },
    { id: "h2", name: "Read for 30 minutes", streak: "🔥 12" },
    { id: "h3", name: "Exercise", streak: "🔥 5" }
  ];
  const [completed, setCompleted] = useState([]);
  const totalHabits = habits.length;
  const completedCount = completed.length;
  const progress = (completedCount / totalHabits) * 100;

  const toggleHabit = (id) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };
  return (
    <main className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {/* Top bar */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold">BetterMe</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge text-bg-light border">
                {user?.isPro ? 'Premium Plan' : 'Free Plan'}
              </span>
              <div className="dropdown">
                <button
                  className="btn p-0 border-0 bg-transparent d-flex align-items-center gap-2"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <PersonCircle size={24} className="text-secondary" />
                  {user && (
                    <span className="d-none d-md-inline text-secondary small">
                      {user.name}
                    </span>
                  )}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                  {user && (
                    <li>
                      <div className="dropdown-item-text">
                        <div className="fw-semibold">{user.name}</div>
                        <div className="small text-muted">{user.email}</div>
                      </div>
                    </li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={() => navigate('/user-profile')}>
                      View Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => navigate('/upgrade')}>
                      Upgrade
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* GRID SAMPLE: two cards side by side on md+ */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="text-muted small">Today&apos;s Progress</span>
                  </div>
                  <div className="display-6 fw-bold">{`${completedCount}/${totalHabits}`}</div>
                  <div className="progress mt-3" role="progressbar" aria-label="Daily progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar bg-success" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="text-muted small mb-1">Best Streak</div>
                  <div className="display-6 fw-bold">12 days</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section header with Add Habit button */}
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h2 className="h5 mb-0">Today&apos;s Habits</h2>
            <button className="btn btn-custom btn-custom-sm" onClick={() => setShowHabitModal(true)}>+ Add Habit</button>
          </div>

          {/* Habits card */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="text-muted small">Daily Progress</div>
                <div className="text-muted small">{`${Math.round(progress)}%`}</div>
              </div>

              <div className="progress mb-3" role="progressbar" aria-label="Daily progress bar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bg-success" style={{ width: `${progress}%` }} />
              </div>

              <ul className="list-group list-group-flush">
                {habits.map((h, i) => (
                  <li key={h.id || i} className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id={`habit-${i}`}
                        checked={completed.includes(h.id)}
                        onChange={() => toggleHabit(h.id)}
                      />
                      <label className="form-check-label" htmlFor={`habit-${i}`}>
                        {h.name}
                      </label>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge rounded-pill text-bg-light border">{h.streak}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm d-flex align-items-center"
                        onClick={() => navigate(`/edit-habit/${h.id}`)}
                      >
                        <PencilSquare size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Upgrade card */}
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
              <div>
                <div className="fw-semibold">Tracking 3 of 3 habits</div>
                <div className="text-muted small">Upgrade to Premium for unlimited habits, templates &amp; badges</div>
              </div>
              <button className="btn btn-custom">Upgrade</button>
            </div>
          </div>
          <HabitModal show={showHabitModal} onClose={() => setShowHabitModal(false)} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;