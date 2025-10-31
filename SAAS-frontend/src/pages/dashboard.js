import React, { useEffect, useState } from "react";
import "../styles/buttons.css";
import HabitModal from "../components/HabitModal";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadHabits() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("http://localhost:5000/api/habits", { signal: controller.signal });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || `Failed to fetch habits (${res.status})`);
        }
        const data = await res.json();
        // Accept either an array or an object with a 'habits' property
        const items = Array.isArray(data) ? data : (data?.habits ?? []);
        setHabits(items);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load habits.");
        }
      } finally {
        setLoading(false);
      }
    }
    loadHabits();
    return () => controller.abort();
  }, []);
  return (
    <main className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {/* Top bar */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold">BetterMe</span>
            </div>
            <span className="badge text-bg-light border">Free Plan</span>
          </div>

          {/* GRID SAMPLE: two cards side by side on md+ */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="text-muted small">Today&apos;s Progress</span>
                  </div>
                  <div className="display-6 fw-bold">0/4</div>
                  <div className="progress mt-3" role="progressbar" aria-label="Daily progress" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar" style={{ width: "0%" }} />
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
            <button className="btn btn-custom btn-custom-sm" data-bs-toggle="modal" data-bs-target="#addHabitModal">+ Add Habit</button>
          </div>

          {/* Habits card */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="text-muted small">Daily Progress</div>
                <div className="text-muted small">0%</div>
              </div>

              <div className="progress mb-3" role="progressbar" aria-label="Daily progress bar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bg-success" style={{ width: "0%" }} />
              </div>

              {loading && <div className="text-center py-3 text-muted small">Loading habits…</div>}
              {error && <div className="alert alert-danger mb-0">{error}</div>}
              {!loading && !error && habits.length === 0 && (
                <div className="text-center py-3 text-muted small">No habits yet. Click “+ Add Habit”.</div>
              )}
              {!loading && !error && habits.length > 0 && (
                <ul className="list-group list-group-flush">
                  {habits.map((h, i) => {
                    const name = h.name || h.title || h.habitName || "Habit";
                    const streak = typeof h.streak === "number" ? h.streak : (h?.stats?.streak ?? 0);
                    const id = h.id || h._id || `habit-${i}`;
                    return (
                      <li key={id} className="list-group-item d-flex align-items-center justify-content-between">
                        <div className="form-check">
                          <input className="form-check-input me-2" type="checkbox" id={`habit-${i}`} />
                          <label className="form-check-label" htmlFor={`habit-${i}`}>
                            {name}
                          </label>
                        </div>
                        <span className="badge rounded-pill text-bg-light border">{streak}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
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
          <HabitModal />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;