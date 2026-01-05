import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REGEX, PASS_CHECKS } from '../../services/validation';
import { registerUser } from '../../services/api'; 
import Input from '../../components/Input/Input'; // Import Added
import { ROUTES } from '../../services/routes'; 
import './Register.scss'; // Assuming you have this or use Login.scss

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({ username: '', email: '' });
  const [passwordMissing, setPasswordMissing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- VALIDATION ---
  const validateInput = (name, value) => {
    // Password Checklist
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

    // Username & Email
    let errorMsg = '';
    if (!value) {
      setErrors(prev => ({ ...prev, [name]: '' }));
      return;
    }
    if (name === 'username' && !REGEX.username.test(value)) {
      errorMsg = 'Username must contain only letters';
    }
    if (name === 'email' && !REGEX.email.test(value)) {
      errorMsg = 'Please enter a valid email address';
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  // --- SUBMIT ---
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (errors.email || errors.username || passwordMissing.length > 0 || 
        !formData.email || !formData.username || !formData.password) {
      return;
    }

    try {
      setIsLoading(true);
      await registerUser(formData);
      alert('Registration Successful! Please Login.');
      navigate(ROUTES.LOGIN);

    } catch (err) {
      console.error(err);
      alert('Registration failed. Username may be taken.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header"><h2>Create Account</h2></div>
        
        <form onSubmit={handleRegister}>
          
          <Input 
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username} // Pass the error string directly
            required
          />

          <Input 
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          {/* Password Field - Needs special handling for the list below it */}
          <div>
            <Input 
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              // If missing items exist, show red border (passed as boolean true)
              error={passwordMissing.length > 0 && formData.password ? true : false}
              required
            />
            
            {/* Custom Checklist UI (Kept separate from Input component) */}
            {formData.password && passwordMissing.length > 0 && (
              <div className="password-requirements">
                <small>Missing:</small>
                <ul>
                  {passwordMissing.map((err, i) => (
                    <li key={i} className="error-text-bullet">{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <button type="submit" className="btn-full" 
            disabled={isLoading || !!errors.email || !!errors.username || passwordMissing.length > 0}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="auth-footer">Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link></p>
      </div>
    </div>
  );
};

export default Register;