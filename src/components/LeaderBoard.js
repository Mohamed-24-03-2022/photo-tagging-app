import React from 'react';
import BasicTable from './BasicTable';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const LeaderBoard = ({ setIsLeaderBoard, setBodyEvents }) => {
  const closeLeaderBoard = (e) => {
    setIsLeaderBoard(false);
    setBodyEvents('all')
  }
  return (
    <div className="leader-board absolute flex max-h-[700px] w-min flex-col items-center bg-white p-8 space-y-4">
      <h2 className="self-start text-lg font-bold">Leader Board</h2>
      <BasicTable />
      <AiOutlineCloseCircle onClick={closeLeaderBoard} className='absolute text-black text-lg top-0 right-[15px] cursor-pointer' />
    </div>
  );
};

export default LeaderBoard;
