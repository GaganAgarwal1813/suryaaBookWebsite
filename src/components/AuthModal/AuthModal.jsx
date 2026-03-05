import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import { useFormData } from '../../hooks/useFormData';
import Modal from '../Modal/Modal';
import './AuthModal.css';

const INITIAL_FORM = { name: '', email: '', password: '' };

const AuthModal = ({ isOpen, onClose }) => {
  const { loginWithEmail, registerWithEmail, loginWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const { formData, handleChange, resetForm } = useFormData(INITIAL_FORM);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    handleChange(e);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await loginWithEmail(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          setError('Please enter your name.');
          setLoading(false);
          return;
        }
        await registerWithEmail(formData.name, formData.email, formData.password);
      }
      resetForm();
      onClose();
    } catch (err) {
      console.error('Auth error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      console.error('Google sign-in error:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    resetForm();
  };

  return (
    <Modal
      title={isLogin ? 'Login' : 'Create Account'}
      onClose={onClose}
      maxWidth="420px"
      className="auth-modal-panel"
    >
      <p className="auth-subtitle">
        {isLogin
          ? 'Welcome back! Sign in to track your orders.'
          : 'Create an account to place orders and track them.'}
      </p>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="auth-form-group">
            <label htmlFor="auth-name">Full Name</label>
            <input
              type="text"
              id="auth-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required={!isLogin}
            />
          </div>
        )}
        <div className="auth-form-group">
          <label htmlFor="auth-email">Email</label>
          <input
            type="email"
            id="auth-email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="auth-form-group">
          <label htmlFor="auth-password">Password</label>
          <input
            type="password"
            id="auth-password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={isLogin ? 'Enter your password' : 'Create a password (min 6 chars)'}
            required
            minLength={6}
          />
        </div>
        <button type="submit" className="auth-submit-btn" disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
        </button>
      </form>

      <div className="auth-divider">
        <span>or</span>
      </div>

      <button
        className="google-sign-in-btn"
        onClick={handleGoogleSignIn}
        disabled={loading}
      >
        <svg width="20" height="20" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        Continue with Google
      </button>

      <p className="auth-toggle">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button onClick={toggleMode} className="auth-toggle-btn">
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </Modal>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AuthModal;
