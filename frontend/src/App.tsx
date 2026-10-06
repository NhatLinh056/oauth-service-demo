import { useEffect, useState } from 'react';
import './App.css';

type Provider = 'google' | 'facebook';

type User = {
  id: string;
  name: string;
  email: string | null;
  photoUrl: string | null;
};

type LoginState = {
  user: User | null;
  provider: Provider | null;
  error: string;
};

const loggedOutState: LoginState = {
  user: null,
  provider: null,
  error: '',
};

function getInitialLoginState(): LoginState {
  const params = new URLSearchParams(window.location.search);
  const userText = params.get('user');
  const providerText = params.get('provider');

  if (!userText || (providerText !== 'google' && providerText !== 'facebook')) {
    return loggedOutState;
  }

  try {
    return {
      user: JSON.parse(userText) as User,
      provider: providerText,
      error: '',
    };
  } catch {
    return {
      ...loggedOutState,
      error: 'Không thể đọc thông tin user từ OAuth callback.',
    };
  }
}

function App() {
  const [loginState, setLoginState] = useState<LoginState>(getInitialLoginState);
  const { user, provider, error } = loginState;

  useEffect(() => {
    if (window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  function handleLogin(selectedProvider: Provider) {
    window.location.href = `http://localhost:3000/auth/${selectedProvider}`;
  }

  function handleLogout() {
    setLoginState(loggedOutState);
  }

  if (user && provider) {
    return (
      <main className="login-page">
        <section className="login-card">
          <h1>Đăng nhập thành công</h1>
          <p>Bạn đã đăng nhập bằng {provider}.</p>

          <div className="user-information">
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Tên:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email ?? 'Không có email'}
            </p>
          </div>

          <button
            className="login-button logout-button"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>OAuth Demo</h1>
        <p>Đăng nhập bằng một tài khoản có sẵn.</p>

        {error && <p className="error-message">{error}</p>}

        <button
          className="login-button google-button"
          type="button"
          onClick={() => handleLogin('google')}
        >
          Login with Google
        </button>

        <button
          className="login-button facebook-button"
          type="button"
          onClick={() => handleLogin('facebook')}
        >
          Login with Facebook
        </button>
      </section>
    </main>
  );
}

export default App;
