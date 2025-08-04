// HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import { FaUpload, FaListAlt, FaTools } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();

  const options = [
    {
      icon: <FaUpload size={40} />,
      title: 'Upload',
      description: 'Submit a new file or Bewerbung.',
      path: '/upload',
    },
    {
      icon: <FaListAlt size={40} />,
      title: 'Submissions',
      description: 'Browse, filter, and export uploaded entries.',
      path: '/submissions',
    },
    {
      icon: <FaTools size={40} />,
      title: 'Dev Dashboard',
      description: 'Access developer tools and debug info.',
      path: '/dashboard',
    },
  ];

  return (
    <div className="homepage">
      <h1>Wähle deinen Bereich im BewerbungsArchiv</h1>
      <div className="options-grid">
        {options.map((opt) => (
          <div
            key={opt.title}
            className="option-card"
            onClick={() => navigate(opt.path)}
          >
            {opt.icon}
            <h2>{opt.title}</h2>
            <p>{opt.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
