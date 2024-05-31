import React from 'react';
import { LoginProvider } from './context/LoginContext';
import LoginForm from './components/LoginForm';
import './App.css';

const App: React.FC = () => {
  return (
    <LoginProvider>
      <div className="App-container">
        <div className="App">
          <div className="content">
              <h2>Login to Dashboard</h2>
            <LoginForm />
          </div>
        </div>
        <footer className="footer">
          <p>Protected by reCAPTCHA. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> & <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.</p>
        </footer>
      </div>
    </LoginProvider>
  );
};

export default App;