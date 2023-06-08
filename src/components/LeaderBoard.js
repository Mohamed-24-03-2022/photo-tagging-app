import React from 'react';

const LeaderBoard = () => {
  return (
    <div className="absolute left-[200px] top-0 flex h-[500px] w-[330px] flex-col items-center bg-white p-8 space-y-4">
      <h2 className="self-start text-lg font-bold">Leader Board</h2>
      <div className="flex space-x-10  ">
        <div className="rank space-y-6">
          <p>Rank</p>
          <p>1</p>
          <p>1</p>
          <p>1</p>
        </div>
        <div className="user-name space-y-6">
          <p>User Name</p>
          <p>Mohamed</p>
          <p>Mohamed</p>
          <p>Mohamed</p>
        </div>
        <div className="time space-y-6">
          <p>time</p>
          <p>0:06:11</p>
          <p>0:06:11</p>
          <p>0:06:11</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
