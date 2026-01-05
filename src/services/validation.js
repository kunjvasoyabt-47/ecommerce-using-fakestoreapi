export const REGEX = {
  // Username: Starts with a letter, allows spaces between names, no numbers/special chars
  username: /^[A-Za-z]+( [A-Za-z]+)*$/,
  
  // Email: Standard pattern
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  // Password: The main strict check (used for final submit)
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/
};

// Helpers for the Password Checklist
export const PASS_CHECKS = {
  hasLower: /[a-z]/,
  hasUpper: /[A-Z]/,
  hasNumber: /\d/,
  hasSpecial: /[@$!%*?&]/,
  minLength: /.{4,}/
};