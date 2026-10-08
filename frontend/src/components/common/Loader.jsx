import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ label = 'Loading...', fullScreen = false }) => {
  return (
    <div className={`loader-container ${fullScreen ? 'loader-fullscreen' : ''}`}>
      <div className="loader-spinner-wrapper">
        <Loader2 className="loader-spin-icon" size={36} />
      </div>
      {label && <p className="loader-label">{label}</p>}
    </div>
  );
};

export default Loader;
