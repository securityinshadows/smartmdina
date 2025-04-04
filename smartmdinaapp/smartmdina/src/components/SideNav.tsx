import React from 'react';
import { Link } from 'react-router-dom'; 
import './SideNav.css';
import jobIcon from '../components/icons/jobicon.png';
import applicationIcon from '../components/icons/applicationicon.png';
import cvIcon from '../components/icons/cvicon.png';
import notifIcon from '../components/icons/notificon.png'

const SideNav: React.FC = () => {
  return (
    <div className="side-nav">
      <Link to="/user/employment/myjobs" className="side-nav-item">
        <img src={jobIcon} alt="My Jobs" />
        <span>My Jobs</span>
      </Link>

      
      <Link to="/user/employment/myapplications" className="side-nav-item">
        <img src={applicationIcon} alt="My Applications" />
        <span>My Applications</span>
      </Link>

      <Link to="/user/employment/mycv" className="side-nav-item">
        <img src={cvIcon} alt="My CV" />
        <span>My CV</span>
      </Link>

      <Link to="/user/employment/notifications" className="side-nav-item">
        <img src={notifIcon} alt="Notifications" />
        <span>Notifications</span>
      </Link>
    </div>
  );
};

export default SideNav;

