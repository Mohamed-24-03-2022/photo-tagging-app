import React, { useState } from 'react';
import { MdOutlineOpenInNew } from 'react-icons/md';

const CharacterBtn = ({ characters, characterName, i, img, handleClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseIn = () => {
    setIsHovered(true);
  };
  const handleMouseOut = () => {
    setIsHovered(false);
  };
  const handleHover = () => {
    setIsHovered(true);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseIn}
      onMouseOut={handleMouseOut}
      onMouseMove={handleHover}
      type="button"
      disabled={characters[i].isClicked}
      className={`relative flex w-full items-center justify-between rounded-l px-4 py-2 text-left text-gray-800 hover:bg-gray-200
      ${characters[i].isClicked ? 'line-through' : ''}`}
    >
      <li>{characterName} </li>

      {img && !characters[i].isClicked ? (
        <>
          <MdOutlineOpenInNew className="text-lg" />
          <div
            className={`show-case absolute left-[200px] top-[0px] w-[200px] ${isHovered ? '' : 'hidden'
              }`}
          >
            <img src={img} alt="show-case-img" />
          </div>
        </>
      ) : (
        ''
      )}
    </button>
  );
};

export default CharacterBtn;
