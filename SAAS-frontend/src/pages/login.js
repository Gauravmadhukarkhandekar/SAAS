import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/buttons.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store auth token and user info
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <span className="fs-1" role="img" aria-label="BetterMe logo">🎯</span>
                <h2 className="mt-2 mb-1">BetterMe</h2>
                <p className="text-muted small">Sign in to your account</p>
              </div>

              {error && (
                <div className="alert alert-danger py-2 mb-3" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    required
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className="btn btn-custom"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </div>
              </form>

              <div className="text-center">
                <p className="mb-2 small text-muted">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-decoration-none">
                    Sign up
                  </Link>
                </p>
                <p className="mb-0 small">
                  <Link to="/" className="text-decoration-none text-muted">
                    ← Back to home
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

