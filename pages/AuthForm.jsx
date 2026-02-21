import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AuthForm() {
  const { signup, login } = useAuth();
  const loc      = useLocation();
  const nav      = useNavigate();
  const isSignUp = loc.pathname === '/signup';

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr]           = useState('');

  useEffect(() => {
    setEmail(''); setPassword(''); setErr('');
  }, [loc.pathname]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signup(email, password);
        nav('/login');
      } else {
        await login(email, password);
        nav('/');                       
      }
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow-lg"
      >
        <h2 className="text-center text-2xl font-bold text-slate-800">
          {isSignUp ? 'Create account' : 'Sign in'}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full rounded-md border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full rounded-md border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-gradient-to-r from-sky-400 to-teal-400 py-3 font-semibold text-white hover:from-teal-400 hover:to-sky-400 focus:outline-none focus:ring-4 focus:ring-teal-300"
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>

        <p className="text-center text-sm text-slate-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link
            to={isSignUp ? '/login' : '/signup'}
            className="font-medium text-teal-600 hover:underline"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </Link>
        </p>

        {err && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {err}
          </div>
        )}
      </form>
    </section>
  );
}
