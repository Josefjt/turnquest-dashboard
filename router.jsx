import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthForm from './pages/AuthForm.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import TurnQuest from './components/TurnQuest.jsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<AuthForm />} />
      <Route path="/signup" element={<AuthForm />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <TurnQuest />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);
