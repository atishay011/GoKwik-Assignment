import React from 'react';
import { useLogin } from '../context/LoginContext';

const LoginForm: React.FC = () => {
  const {
    input,
    inputError,
    formValid,
    validateInput,
    handleSubmit,
  } = useLogin();

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="input">Email or Mobile Number</label>
        <input
          type="text"
          id="input"
          value={input}
          onChange={(e) => validateInput(e.target.value)}
          required
        />
        {inputError && <p>{inputError}</p>}
      </div>
      <button type="submit" disabled={!formValid}>
        Next
      </button>
      <div className="or-divider">or</div>
      <button type="button" className="google-signin">
        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google logo" />
        Sign in with Google
      </button>
    </form>
  );
};

export default LoginForm;