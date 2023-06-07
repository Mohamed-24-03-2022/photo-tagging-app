import './App.css';
import mainImg from './assets/raidthree.png';
import { useRef, useState } from 'react';
import DropdownMenu from './components/DropdownMenu';
import WhatToFindMenu from './components/WhatToFindMenu';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const clickCoordinatesRef = useRef({})

  const setXYClass = (x, y, target) => {
    let r = document.querySelector(':root');
    if (target === 'menu') {
      x += 40;
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
    clickCoordinatesRef.current = findXYCoordinates(e)
  };

  const handleMouseIn = (e) => {
    setIsHovered(true);
  };
  const handleMouseMove = (e) => {
    setXYClass(e.pageX, e.pageY, 'cursor');
  };
  const handleMouseOut = (e) => {
    setIsHovered(false);
  };

  return (
    <>
      <nav className="flex p-4 text-white">
        <h1 className="font-serif text-3xl">FindUs</h1>
      </nav>
      <div className="content flex flex-wrap text-[#333]  xl:flex-nowrap">
        <div className="side-bar w-[230px]">
          <div className="settings space-y-4 py-4 text-center">
            <div className="time-stamp">
              <p>23:41:28</p>
            </div>
            <div className="leader-board">
              <p>Scoreboard</p>
            </div>
          </div>
          <div className="what-to-find w-full self-start">
            <WhatToFindMenu />
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
      </div>

      {/* NOTE floating components */}
      <DropdownMenu
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        clickCoordinatesRef={clickCoordinatesRef}
      />

      {/* 
      <img src={mainImg} usemap="#image-map">
      <map name="image-map">
      <area target="" alt="" title="owl" href="" coords="29,103,61,182" shape="rect">
      <area target="" alt="" title="baby-yoda" href="" coords="71,928,117,875" shape="rect">
      <area target="" alt="" title="alpha" href="" coords="854,866,970,943" shape="poly">
      <area target="" alt="" title="bill-and-ted" href="" coords="256,1475,94,1371" shape="rect">
      <area target="" alt="" title="astroBoy" href="" coords="301,1292,276,1336" shape="rect">
      </map> 
      */}
    </>
  );
}

export default App;
