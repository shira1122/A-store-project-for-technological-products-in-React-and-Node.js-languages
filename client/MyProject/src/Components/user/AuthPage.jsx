// AuthPage.jsx
import React, { useState } from 'react';
import Login from './login';
import Register from './register';
function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <h1>ברוך הבא</h1>
      <div>
        <button onClick={() => setIsLogin(true)}>התחברות</button>
        <button onClick={() => setIsLogin(false)}>הרשמה</button>
      </div>

      <hr />

      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default AuthPage;