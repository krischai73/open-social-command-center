
import React from 'react';

const SkipToContent = () => {
  return (
    <a 
      href="#main-content" 
      className="skip-link"
      onClick={(e) => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView();
        }
      }}
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
