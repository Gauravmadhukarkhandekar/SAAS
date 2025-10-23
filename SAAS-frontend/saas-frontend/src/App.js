import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading backend...');

  useEffect(() => {
    fetch('http://localhost:3001/api')
      .then((response) => response.json())
      .then((data) => setMessage(data.message || 'OK'))
      .catch((err) => setMessage(`Failed to reach backend: ${err?.message || 'Unknown error'}`));
  }, []);

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>🎯 BetterMe</h2>
          </div>
          <div className="nav-menu">
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#about" className="nav-link">About</a>
            <button className="nav-btn">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Build Better Habits with 
              <span className="gradient-text"> Smart Tracking</span>
            </h1>
            <p className="hero-description">
              Track, monitor, and achieve your goals with our powerful habit tracking platform. 
              Join thousands of users building better habits every day.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">Start Tracking Habits</button>
              <button className="btn-secondary">See How It Works</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <h3>50K+</h3>
                <p>Habits Tracked</p>
              </div>
              <div className="stat">
                <h3>85%</h3>
                <p>Success Rate</p>
              </div>
              <div className="stat">
                <h3>30 Days</h3>
                <p>Free Trial</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <div className="card-icon">📈</div>
              <h4>Progress</h4>
              <p>Track your streaks</p>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">🎯</div>
              <h4>Goals</h4>
              <p>Set & achieve</p>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">📱</div>
              <h4>Mobile</h4>
              <p>Track anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Why Choose BetterMe?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Visual Progress</h3>
              <p>See your habit streaks and progress with beautiful charts and graphs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Smart Reminders</h3>
              <p>Get personalized notifications to keep you on track with your habits.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Goal Setting</h3>
              <p>Set specific, measurable goals and track your journey to success.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile App</h3>
              <p>Track habits on the go with our intuitive mobile application.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Community</h3>
              <p>Connect with others, share progress, and stay motivated together.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Achievements</h3>
              <p>Earn badges and rewards as you build consistent habits over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="pricing-subtitle">Start with 3 free habits, upgrade anytime for unlimited tracking</p>
          <div className="pricing-grid">
            {/* Free Plan */}
            <div className="pricing-card free">
              <div className="pricing-header">
                <h3>Free</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">0</span>
                  <span className="period">/month</span>
                </div>
                <p className="plan-description">Perfect for getting started</p>
              </div>
              <div className="pricing-features">
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Track up to 3 habits</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Basic progress tracking</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Mobile app access</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>7-day streak history</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Basic reminders</span>
                </div>
                <div className="feature-item disabled">
                  <span className="cross">✗</span>
                  <span>Advanced analytics</span>
                </div>
                <div className="feature-item disabled">
                  <span className="cross">✗</span>
                  <span>Community features</span>
                </div>
                <div className="feature-item disabled">
                  <span className="cross">✗</span>
                  <span>Custom themes</span>
                </div>
              </div>
              <button className="pricing-btn free-btn">Get Started Free</button>
            </div>

            {/* Premium Plan */}
            <div className="pricing-card premium popular">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Premium</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">9.99</span>
                  <span className="period">/month</span>
                </div>
                <p className="plan-description">For serious habit builders</p>
              </div>
              <div className="pricing-features">
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Unlimited habits</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Advanced progress tracking</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Mobile app access</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Unlimited streak history</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Smart reminders</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Advanced analytics & insights</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Community features</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Custom themes & personalization</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Data export</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Priority support</span>
                </div>
              </div>
              <button className="pricing-btn premium-btn">Start Premium Trial</button>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card pro">
              <div className="pricing-header">
                <h3>Pro</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">19.99</span>
                  <span className="period">/month</span>
                </div>
                <p className="plan-description">For teams and power users</p>
              </div>
              <div className="pricing-features">
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Everything in Premium</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Team collaboration</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Family sharing (up to 6 users)</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Advanced goal setting</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Habit coaching AI</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>Custom integrations</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>White-label options</span>
                </div>
                <div className="feature-item">
                  <span className="check">✓</span>
                  <span>24/7 priority support</span>
                </div>
              </div>
              <button className="pricing-btn pro-btn">Go Pro</button>
            </div>
          </div>
          
          <div className="pricing-footer">
            <p>All plans include a 30-day free trial. Cancel anytime.</p>
            <div className="pricing-guarantee">
              <span className="guarantee-icon">🛡️</span>
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Build Better Habits?</h2>
            <p>Join thousands of users who are already transforming their lives with better habits.</p>
            <div className="cta-buttons">
              <button className="btn-primary large">Start Your Free Trial</button>
              <button className="btn-outline large">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>BetterMe</h3>
              <p>Empowering people to build better habits and achieve their goals.</p>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#mobile">Mobile App</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#guides">Habit Guides</a></li>
                <li><a href="#community">Community</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 BetterMe. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#cookies">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Backend Status (Hidden) */}
      <div style={{ display: 'none' }}>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
