import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AgencyPortfolio from './components/AgencyPortfolio';
import AdminPanel from './components/AdminPanel';
import { useAuth } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user === undefined) {
    // Optional: Add a loading spinner here while auth state is being determined
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/admin" />;
};

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<AgencyPortfolio />} />
          <Route path="/admin" element={user ? <Navigate to="/dashboard" /> : <AdminPanel />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
