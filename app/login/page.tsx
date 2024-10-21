"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Credenciais fixas (login: admin, senha: 1234)
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('loggedIn', 'true');
      router.push('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  input {
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    padding: 0.75rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #005bb5;
    }
  }

  h2 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 1rem;
`;
