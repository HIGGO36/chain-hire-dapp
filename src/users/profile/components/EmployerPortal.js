// EmployerPortal.js
import React from 'react';

const EmployerPortal = ({ portalStyle, ovalStyle, buttonContainerStyle, buttonStyle, closeButtonStyle }) => {
  return (
    <div style={portalStyle}>
      {/* Oval shape */}
      <div style={ovalStyle}>
        {/* Buttons */}
        <div style={buttonContainerStyle}>
          <button style={buttonStyle}>Button 1</button>
          <button style={buttonStyle}>Button 2</button>
          <button style={buttonStyle}>Button 3</button>
          <button style={buttonStyle}>Button 4</button>
          <button style={buttonStyle}>Button 5</button>
        </div>
        {/* Upper right corner button */}
        <button style={closeButtonStyle}>X</button>
      </div>
    </div>
  );
};

export default EmployerPortal;
