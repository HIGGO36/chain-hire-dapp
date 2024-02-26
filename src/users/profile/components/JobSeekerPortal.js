import React from 'react';

const JobSeekerPortal = () => {
  return (
    <div className="relative w-3/5 mx-auto mt-20">
      {/* Oval shape */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black rounded-full border-10 border-white">
        {/* Buttons */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-yellow-400 text-black rounded-full">Button 1</button>
          <button className="absolute left-full transform translate-x-1/2 px-4 py-2 bg-yellow-400 text-black rounded-full">Button 2</button>
          <button className="absolute right-full transform translate-x-1/2 px-4 py-2 bg-yellow-400 text-black rounded-full">Button 3</button>
          <button className="absolute right-1/2 transform translate-x-1/2 translate-y-1/2 px-4 py-2 bg-yellow-400 text-black rounded-full">Button 4</button>
          <button className="absolute left-0 top-full transform -translate-y-1/2 px-4 py-2 bg-yellow-400 text-black rounded-full">Button 5</button>
        </div>
        {/* Upper right corner button */}
        <button className="absolute top-0 right-0 px-4 py-2 bg-yellow-400 text-black rounded-full">X</button>
      </div>
    </div>
  );
};

export default JobSeekerPortal;
