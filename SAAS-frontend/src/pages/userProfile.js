

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  // Prefill with demo values; replace with real user data when wiring auth
  const [form, setForm] = useState({
    username: "anushka",
    email: "anushka@example.com",
    password: "********", // hidden
    plan: "Free",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    // Simulate save
    setTimeout(() => {
      // Persist locally so dashboard/profile can read if needed
      localStorage.setItem("userProfile", JSON.stringify(form));
      setSaving(false);
      setMsg("Profile saved.");
    }, 400);
  };

  return (
    <main className="container py-4">
      <div className="col-12 col-lg-6 mx-auto">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="mb-0">User Profile</h4>
          <span className="badge text-bg-light border">{form.plan} Plan</span>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={onSubmit}>
              {/* Username */}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={form.username}
                  onChange={onChange}
                  placeholder="your username"
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="you@example.com"
                />
              </div>

              {/* Password (hidden/obscured) */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    value={form.password}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => alert("Use the reset flow to change your password.")}
                  >
                    Change
                  </button>
                </div>
                <div className="form-text">For security, your password is hidden.</div>
              </div>

              {/* Plan */}
              <div className="mb-3">
                <label className="form-label">Plan</label>
                <div className="d-flex gap-2">
                  <select
                    className="form-select w-auto"
                    name="plan"
                    value={form.plan}
                    onChange={onChange}
                  >
                    <option value="Free">Free</option>
                    <option value="Premium">Premium</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-custom"
                    onClick={() => navigate("/upgrade")}
                  >
                    Upgrade
                  </button>
                </div>
              </div>

              {/* Save */}
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-custom" disabled={saving}>
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>

              {msg && <div className="alert alert-success mt-3 py-2 mb-0">{msg}</div>}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;