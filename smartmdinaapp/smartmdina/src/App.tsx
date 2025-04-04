import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Page imports:
import BusinessModule from './pages/business/BusinessModule';
import HomePage from './pages/HomePage';
import JobsModule from './pages/employment/JobsModule';
import MyJobs from './pages/employment/MyJobs';
import MyApplications from './pages/employment/MyApplications';
import MyCV from './pages/employment/MyCV';
import UserHomePage from './pages/UserHomePage';
import JobDetails from './pages/employment/JobDetails';
import StudentPage from './pages/student/StudentModule';
import LibrariesPage from './pages/student/LibrariesPage';
import SportsPage from './pages/student/SportsPage';
import StudentDealsPage from './pages/student/StudentDealsPage';
import SchoolsPage from './pages/student/SchoolsPage';
import TourismModule from './pages/tourism/TourismModule';
import AdminModule from './pages/admin/AdminModule';
import ContributorModule from './pages/admin/ContModule';

import './App.css';
import LoginPopup from './components/LoginPopup';
import TourismDetails from './pages/tourism/TourismDetails';
import EducationalServiceDetails from './pages/student/EducationalServiceDetails';

const App: React.FC = () => {

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Check if a user role is stored in localStorage
    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole);
  }, []);

  const handleLoginSuccess = () => {
    // Set role after login and store it in localStorage
    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole);
  };

  return (
    <Router>
      <Routes>
        {/* Logged OUT */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/business" element={<BusinessModule />} />
        
        {/* Logged IN */}
        <Route path="/user/employment/myjobs" element={<MyJobs />} />
        <Route path="/user/employment/myapplications" element={<MyApplications />} />
        <Route path="/user/employment/mycv" element={<MyCV />} />
        <Route path="/user/home" element={<UserHomePage />} />
        <Route path="/user/employment" element={<JobsModule />} />
        <Route path="/user/employment/:jobId" element={<JobDetails />} />
        
        <Route path="/user/education" element={<StudentPage />} />
        <Route path="/user/education/schools-universities" element={<SchoolsPage />} />
        <Route path="/user/education/student-deals" element={<StudentDealsPage />} />
        <Route path="/user/education/libraries" element={<LibrariesPage />} />
        <Route path="/user/education/sports-fitness" element={<SportsPage />} />
        <Route path="/user/education/:serviceId" element={<EducationalServiceDetails />} />
        <Route path="/user/tourism" element={<TourismModule />} />
        <Route path="/user/tourism/:serviceId" element={<TourismDetails />} />
        
        {/* Testing */}
        <Route path="/admin/studio" element={<ContributorModule />} />
        <Route path="/admin" element={<AdminModule />} />
      </Routes>

      {/* Login Popup */}
      <LoginPopup
        isVisible={!role} // Popup should be visible if there's no role (i.e., user is not logged in)
        onClose={() => setRole(null)} // Clear role if login popup is closed
        onLoginSuccess={handleLoginSuccess} // Pass the handler to update the role after login
      />
    </Router>
  );
};

export default App;
