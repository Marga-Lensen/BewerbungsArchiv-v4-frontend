import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import SubmissionsPage from './pages/SubmissionsPage';
import DevDashboardPage from './pages/DevDashboardPage';

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="submissions" element={<SubmissionsPage />} />
        <Route path="dashboard" element={<DevDashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
