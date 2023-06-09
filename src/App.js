import './App.css';
import mainImg from './assets/raidthree.png';
import { useEffect, useRef, useState } from 'react';
import DropdownMenu from './components/DropdownMenu';
import WhatToFindMenu from './components/WhatToFindMenu';
import ValidationMessage from './components/ValidationMessage';
import LeaderBoard from './components/LeaderBoard';
import camelize from './camelize';
import UserNameField from './components/UserNameField';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseInitializer';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import { MdOutlineScore } from 'react-icons/md';
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
  const [isLeaderBoard, setIsLeaderBoard] = useState(false);
  const [isUserNameField, setIsUserNameField] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const clickCoordinatesRef = useRef({});
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isUserNameField) return;

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
    intervalRef.current = interval;

    return () => {
      clearInterval(interval);
    };
  }, [isUserNameField]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDidUserGetItRightForParent(false);
    }, 3000);

    const didUserFoundThemAll = characters.every(
      (character) => character.isClicked === true
    );
    // setDidUserFoundThemAll(didUserFoundThemAll);
    if (didUserFoundThemAll) {
      clearInterval(intervalRef.current);
      updateDoc(doc(db, 'users', currentUser), {
        time: time,
      }).then((data) => null);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [didUserGetItRightForParent]);

  const setXYClass = (x, y, target) => {
    let r = document.querySelector(':root');
    if (target === 'menu') {
      if (window.scrollY > 750) {
        y -= 150;
      }
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

  const setBodyEvents = (eventProp) => {
    let r = document.querySelector(':root');
    r.style.setProperty(`--bodyEvents`, eventProp);
  };
  const openLeaderBoard = () => {
    setIsLeaderBoard(true);
    setBodyEvents('none');
  };
  return (
    <>
      <nav className="flex p-4 text-white">
        <h1 className="font-serif text-3xl">FindUs</h1>
      </nav>
      <div className="content flex flex-wrap text-[#333]  xl:flex-nowrap">
        <div className="side-bar w-[230px]">
          <div className="settings flex items-start space-x-6 p-4 text-center">
            <div className="icons flex flex-col items-center justify-center space-y-2 font-bold">
              <AvTimerIcon className="text-2xl text-[#333]" />
              <MdOutlineScore className="text-2xl text-[#333]" />
            </div>
            <div className="leader-board-btn flex w-min flex-col items-center justify-start space-y-2 font-bold">
              <p className="w-max self-start">
                {time.hr}:{time.min}:{time.sec}
              </p>
              <button
                type="button"
                onClick={openLeaderBoard}
                className="min-w-max font-bold"
              >
                Leader Board
              </button>
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
      {isLeaderBoard ? (
        <LeaderBoard
          setIsLeaderBoard={setIsLeaderBoard}
          setBodyEvents={setBodyEvents}
        />
      ) : (
        ''
      )}
      {isUserNameField ? (
        <UserNameField
          isUserNameField={isUserNameField}
          setIsUserNameField={setIsUserNameField}
          setBodyEvents={setBodyEvents}
          setCurrentUser={setCurrentUser}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default App;
