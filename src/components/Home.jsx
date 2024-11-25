import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ForkLift</h1>
          <p>
            The ultimate SaaS solution designed to empower the HoReCa industry
            with big data, analytics, AI, and predictive insights.
          </p>
          <button className="cta-button" onClick={()=>navigate('/file-upload')}>Get Started</button>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Features</h2>
        <div className="features-list">
          <div className="feature-card">
            <h3>Big Data Support</h3>
            <p>Handle large-scale data with ease for better decision-making.</p>
          </div>
          <div className="feature-card">
            <h3>Data Analytics</h3>
            <p>
              Unlock actionable insights from your data to improve business
              performance.
            </p>
          </div>
          <div className="feature-card">
            <h3>Preprocessing Pipeline</h3>
            <p>
              Streamline data cleaning and transformation for reliable
              analytics.
            </p>
          </div>
          <div className="feature-card">
            <h3>Data Forecasting</h3>
            <p>
              Predict future trends and demands to stay ahead of the
              competition.
            </p>
          </div>
          <div className="feature-card">
            <h3>Anomaly Detection</h3>
            <p>
              Identify irregular patterns and outliers to prevent issues before
              they arise.
            </p>
          </div>
          <div className="feature-card">
            <h3>AI Support</h3>
            <p>
              Integrate advanced AI to automate tasks and drive smarter
              decisions.
            </p>
          </div>
          <div className="feature-card">
            <h3>Interactive Dashboard</h3>
            <p>
              Visualize key metrics with a user-friendly, interactive dashboard.
            </p>
          </div>
          <div className="feature-card">
            <h3>Demographics-Based Analysis</h3>
            <p>Analyze customer trends and behavior based on demographics.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>
              "ForkLift helped us understand our customer behavior and optimize
              our operations. The forecasting tool alone saved us hours of
              manual work!"
            </p>
            <h4>- Jane Doe, Restaurant Owner</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "As a café chain, managing inventory was always a challenge.
              ForkLift's anomaly detection and big data support transformed the
              way we do business."
            </p>
            <h4>- John Smith, Café Manager</h4>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Lift Your Business?</h2>
        <p>
          Experience the power of ForkLift and make data work for you. Start
          today and take your business to new heights.
        </p>
        <button className="cta-button">Start Free Trial</button>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 ForkLift. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </footer>
    </div>
  );
};

export default LandingPage;
