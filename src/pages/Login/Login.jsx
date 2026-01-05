import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { REGEX, PASS_CHECKS } from '../../services/validation';
import { loginUser } from '../../services/api'; 
import Navbar from '../../components/Navbar/Navbar';
import './Login.scss';
import { ROUTES } from '../../services/routes';

const Login = () => {
  const navigate = useNavigate();

  // FakeStoreAPI requires 'username' and 'password'
  const [credentials, setCredentials] = useState({
    username: '', 
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '' 
  });

  const [passwordMissing, setPasswordMissing] = useState([]);
  const [globalError, setGlobalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- VALIDATION LOGIC ---
  const validateInput = (name, value) => {
    // 1. Password Checklist
    if (name === 'password') {
      const missing = [];
      if (!PASS_CHECKS.hasLower.test(value)) missing.push('1 lowercase letter');
      if (!PASS_CHECKS.hasUpper.test(value)) missing.push('1 uppercase letter');
      if (!PASS_CHECKS.hasNumber.test(value)) missing.push('1 number');
      if (!PASS_CHECKS.hasSpecial.test(value)) missing.push('1 special char (@$!%*?&)');
      if (!PASS_CHECKS.minLength.test(value)) missing.push('At least 4 characters');
      
      setPasswordMissing(missing);
      return; 
    }

    // 2. Username Logic
    let errorMsg = '';
    if (name === 'username') {
      if (!value) {
        errorMsg = '';
      } else if (!REGEX.username.test(value)) {
        errorMsg = 'Username must contain only letters';
      }
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (globalError) setGlobalError('');

    setCredentials(prev => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  // --- API SUBMISSION ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Block submit if there are errors or empty fields
    if (errors.username || passwordMissing.length > 0 || !credentials.username || !credentials.password) {
      return;
    }

    try {
      setIsLoading(true);
      // 1. LOGIN REQUEST
      const response = await loginUser(credentials);
      
      // 2. GET THE TOKEN
      const token = response.data.token;
      
      // 3. STORE IN LOCAL STORAGE
      if (token) {
        localStorage.setItem('userToken', token);
        alert('Login Successful! Token stored.');
        
        // 5. REDIRECT
        navigate(ROUTES.HOME);
      } else {
        throw new Error('No token received');
      }
      
    } catch (err) {
      console.error('Login Failed:', err);
      setGlobalError('Invalid username or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header"><h2>Sign in</h2></div>
        
        <form onSubmit={handleSubmit}>
          {globalError && <div className="error-banner">{globalError}</div>}
          
          {/* USERNAME FIELD */}
          <div className="form-group">
            <label>Username</label>
            <input 
              name="username" 
              type="text" 
              value={credentials.username} 
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''} 
              required 
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          {/* PASSWORD FIELD */}
          <div className="form-group">
            <label>Password</label>
            <input 
              name="password" 
              type="password" 
              value={credentials.password} 
              onChange={handleChange}
              className={passwordMissing.length > 0 && credentials.password ? 'input-error' : ''}
              required 
            />
            
            {/* Checklist */}
            {credentials.password && passwordMissing.length > 0 && (
              <div className="password-requirements">
                <small>Missing:</small>
                <ul>
                  {passwordMissing.map((err, index) => (
                    <li key={index} className="error-text-bullet">{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-full" 
            disabled={
              isLoading ||
              !!errors.username || 
              passwordMissing.length > 0 || 
              !credentials.username || 
              !credentials.password
            }
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="auth-footer">New here? <Link to={ROUTES.REGISTER}>Create an account</Link></p>
      </div>
    </div>
    </>
  );
};

export default Login;