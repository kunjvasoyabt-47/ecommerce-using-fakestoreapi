
import './Input.scss';

const Input = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, // Can be a string (message) or boolean (true/false)
  placeholder,
  required = false,
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        // If 'error' exists (is true or has text), add the red border class
        className={error ? 'input-error' : ''}
        {...props}
      />
      
      {/* If 'error' is a text string, show it. If it's just 'true', show nothing. */}
      {typeof error === 'string' && error.length > 0 && (
        <span className="error-text">{error}</span>
      )}
    </div>
  );
};

export default Input;