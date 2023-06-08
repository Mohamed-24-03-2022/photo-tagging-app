import './App.css';
import mainImg from './assets/raidthree.png';
import { useEffect, useRef, useState } from 'react';
import DropdownMenu from './components/DropdownMenu';
import WhatToFindMenu from './components/WhatToFindMenu';
import ValidationMessage from './components/ValidationMessage';
import LeaderBoard from './components/LeaderBoard';
import camelize from './camelize';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [didUserGetItRightForParent, setDidUserGetItRightForParent] =
    useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characters, setCharacters] = useState([
    { name: 'astroBoy', isClicked: false },
    { name: 'owl', isClicked: false },
    { name: 'alpha', isClicked: false },
    { name: 'billAndTed', isClicked: false },
    { name: 'babyYoda', isClicked: false },
  ]);
  const [time, setTime] = useState({ hr: 0, min: 0, sec: 0 });

  const clickCoordinatesRef = useRef({});

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        const newSec = prevTime.sec + 1;
        const newMin = prevTime.min + Math.floor(newSec / 60);
        const newHr = prevTime.hr + Math.floor(newMin / 60);

        return {
          hr: newHr,
          min: newMin % 60,
          sec: newSec % 60,
        };
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDidUserGetItRightForParent(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [didUserGetItRightForParent]);

  const setXYClass = (x, y, target) => {
    let r = document.querySelector(':root');
    if (target === 'menu') {
      x += 40;
    }
    if (target === 'validationMsg') {
      r.style.setProperty(`--${target}Y`, `${y}px`);
      return;
    }
    r.style.setProperty(`--${target}X`, `${x}px`);
    r.style.setProperty(`--${target}Y`, `${y}px`);
  };

  const findXYCoordinates = (e) => {
    const { naturalWidth, naturalHeight, width, height } = e.target;
    const { offsetX, offsetY } = e.nativeEvent;
    const [normalizedX, normalizedY] = [offsetX / width, offsetY / height];
    const clickedX = Math.floor(normalizedX * naturalWidth);
    const clickedY = Math.floor(normalizedY * naturalHeight);

    return { clickedX, clickedY };
  };

  const handleCLick = async (e) => {
    setXYClass(e.pageX, e.pageY, 'menu');
    setIsVisible(!isVisible);
    clickCoordinatesRef.current = findXYCoordinates(e);
  };

  const handleMouseIn = () => {
    setIsHovered(true);
  };
  const handleMouseMove = (e) => {
    setXYClass(e.pageX, e.pageY, 'cursor');
  };
  const handleMouseOut = () => {
    setIsHovered(false);
  };

  window.addEventListener('scroll', (e) => {
    setXYClass(null, -window.scrollY + 15, 'validationMsg');
  });

  return (
    <>
      <nav className="flex p-4 text-white">
        <h1 className="font-serif text-3xl">FindUs</h1>
      </nav>
      <div className="content flex flex-wrap text-[#333]  xl:flex-nowrap">
        <div className="side-bar w-[230px]">
          <div className="settings space-y-4 py-4 text-center">
            <div className="time-stamp">
              <p>
                {time.hr}:{time.min}:{time.sec}
              </p>
            </div>
            <div className="leader-board-btn">
              <button type="button">Scoreboard</button>
            </div>
          </div>
          <div className="what-to-find w-full self-start">
            <WhatToFindMenu characters={characters} />
          </div>
        </div>

        <div className="main flex w-full flex-col items-center space-y-4 p-6">
          <p>The Raid 3: Scourge of the Machines - by Laurie Greasley</p>
          <div className="img-container ">
            <img
              src={mainImg}
              alt="raid-three"
              onClick={handleCLick}
              onMouseEnter={handleMouseIn}
              onMouseLeave={handleMouseOut}
              onMouseMove={handleMouseMove}
              className={`w-full ${isHovered ? 'disable-cursor' : ''}`}
            />
          </div>
        </div>

        {didUserGetItRightForParent ? (
          <ValidationMessage selectedCharacter={selectedCharacter} />
        ) : (
          ''
        )}
      </div>

      {/* NOTE floating components */}
      <DropdownMenu
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        clickCoordinatesRef={clickCoordinatesRef}
        characters={characters}
        setCharacters={setCharacters}
        camelize={camelize}
        setDidUserGetItRightForParent={setDidUserGetItRightForParent}
        setSelectedCharacter={setSelectedCharacter}
      />
      {/* <LeaderBoard /> */}
    </>
  );
}

export default App;
