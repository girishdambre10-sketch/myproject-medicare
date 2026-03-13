import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');

  .pharma-login-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a1628 0%, #0d2347 50%, #0a1628 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    padding: 24px 0;
  }
  .pharma-login-box {
    background: #ffffff;
    border-radius: 20px;
    padding: 44px 40px;
    width: 440px;
    max-width: 95vw;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  }
  .pharma-login-logo {
    text-align: center;
    margin-bottom: 32px;
  }
  .pharma-login-logo-icon {
    width: 62px;
    height: 62px;
    background: #1e6fff;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    margin: 0 auto 12px;
  }
  .pharma-login-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #1a2332;
  }
  .pharma-login-sub {
    color: #6b7a90;
    font-size: 13px;
    margin-top: 4px;
  }
  .pharma-form-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: #6b7a90;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .pharma-form-control {
    width: 100%;
    padding: 10px 13px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 13.5px;
    font-family: 'DM Sans', sans-serif;
    color: #1a2332;
    background: #fff;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .pharma-form-control:focus {
    border-color: #1e6fff;
    box-shadow: 0 0 0 3px rgba(30,111,255,0.1);
  }
  .pharma-form-group {
    margin-bottom: 16px;
  }
  .pharma-btn-primary {
    width: 100%;
    padding: 12px;
    background: #1e6fff;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 4px;
  }
  .pharma-btn-primary:hover { background: #1558d6; }
  .pharma-error-box {
    color: #ff4757;
    font-size: 13px;
    margin-bottom: 12px;
    padding: 9px 13px;
    background: #ffe8e8;
    border-radius: 8px;
    text-align: center;
  }
  .pharma-success-box {
    color: #00a67d;
    font-size: 13px;
    margin-bottom: 12px;
    padding: 9px 13px;
    background: #e6faf5;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
  }
  .pharma-footer-text {
    text-align: center;
    margin-top: 18px;
    color: #6b7a90;
    font-size: 13px;
  }
  .pharma-footer-text a {
    color: #1e6fff;
    font-weight: 600;
    text-decoration: none;
  }
  .pharma-footer-text a:hover { text-decoration: underline; }
  .pharma-divider {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 20px 0;
  }
  .pharma-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  @media (max-width: 480px) {
    .pharma-form-row { grid-template-columns: 1fr; }
    .pharma-login-box { padding: 32px 22px; }
  }
`;

export default function AdminRegister() {
  const navigate = useNavigate();

  useEffect(() => {
  const unsub = auth.onAuthStateChanged((user) => {
    if (user) navigate("/");
  });
  return () => unsub(); // also add cleanup!
}, [navigate]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmission = () => {
    if (values.name && values.email && values.password && values.confirmPassword) {
      setErrorMsg("");
      if (values.password === values.confirmPassword) {
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then(async (response) => {
            await updateProfile(response.user, { displayName: values.name });
            setSuccessMsg("✅ Registration successful! Redirecting...");
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/");
            }, 3000);
          })
          .catch((err) => {
            setErrorMsg(err.message);
          });
      } else {
        setErrorMsg("Passwords don't match!");
      }
    } else {
      setErrorMsg("Please fill out all required fields.");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="pharma-login-page">
        <div className="pharma-login-box">

          <div className="pharma-login-logo">
            <div className="pharma-login-logo-icon">💊</div>
            <div className="pharma-login-title">PharmaRx</div>
            <div className="pharma-login-sub">Create your account</div>
          </div>

          <div className="pharma-form-group">
            <label className="pharma-form-label">Full Name</label>
            <input
              type="text"
              className="pharma-form-control"
              placeholder="Dr. Full Name"
              onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="pharma-form-group">
            <label className="pharma-form-label">Email Address</label>
            <input
              type="email"
              className="pharma-form-control"
              placeholder="admin@pharma.com"
              onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
            />
          </div>

          <div className="pharma-form-row">
            <div className="pharma-form-group">
              <label className="pharma-form-label">Password</label>
              <input
                type="password"
                className="pharma-form-control"
                placeholder="••••••••"
                onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
              />
            </div>
            <div className="pharma-form-group">
              <label className="pharma-form-label">Confirm Password</label>
              <input
                type="password"
                className="pharma-form-control"
                placeholder="••••••••"
                onChange={(e) => setValues((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && handleSubmission()}
              />
            </div>
          </div>

          {errorMsg && <div className="pharma-error-box">{errorMsg}</div>}
          {successMsg && <div className="pharma-success-box">{successMsg}</div>}

          <button className="pharma-btn-primary" onClick={handleSubmission}>
            Create Account
          </button>

          <hr className="pharma-divider" />

          <div className="pharma-footer-text">
            Already have an account? <Link to="/login">Login here!</Link>
          </div>

        </div>
      </div>
    </>
  );
}