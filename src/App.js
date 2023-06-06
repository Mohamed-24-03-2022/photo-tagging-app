import './App.css';
import mainImg from './assets/raidthree.png';
import { useState } from 'react';
import firebase, { db } from './firebase';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false)

  const setXYClass = (x, y, target) => {
    let r = document.querySelector(':root');
    if (target === 'menu') {
      x += 50;
    }
    r.style.setProperty(`--${target}X`, `${x}px`);
    r.style.setProperty(`--${target}Y`, `${y}px`);
  };

  const handleCLick = (e) => {
    setXYClass(e.pageX, e.pageY, 'menu');
    setIsVisible(!isVisible);
  };
  const handleMouseIn = (e) => {
    setIsHovered(true);
  }
  const handleMouseMove = (e) => {
    setXYClass(e.pageX, e.pageY, 'cursor');
  }
  const handleMouseOut = (e) => {
    setIsHovered(false);
  }
  return (
    <>
      <nav className="flex p-4 text-white">
        <h1 className="text-3xl font-serif">FindUs</h1>
      </nav>

      <div className="content flex h-min">
        <div className="side-bar flex flex-col items-center p-6 w-[230px]">
          <div className="settings py-4">
            <div className="time-stamp">
              <p>23:41:28</p>
            </div>
            <div className="leader-board">
              <p>Scoreboard</p>
            </div>
          </div>
          <div className="what-to-find self-start">
            <p>Find</p>
            <ul>
              <li>Alpha 5</li>
              <li>Astro Boy</li>
              <li>Baby Yoda</li>
              <li>Bill & Ted</li>
              <li>Owl</li>
            </ul>
          </div>
        </div>

        <div className="main p-6 w-full flex flex-col items-center">
          <p>The Raid 3: Scourge of the Machines - by Laurie Greasley</p>
          <div className="img-comtainer">
            <img src={mainImg} alt="raid-three" onClick={handleCLick} onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut} onMouseMove={handleMouseMove} className={isHovered ? 'disable-cursor' : ''} />
          </div>
        </div>

      </div>


      {/* NOTE floating components */}
      <>
        <div
          id="drop-down-menu"
          className={`p-2 h-[160px] w-[100px] bg-white absolute border border-solid menu-position ${!isVisible ? 'hidden' : ''
            }`}
        >
          <ul>
            <li className="cursor-pointer p-[2px]">Alpha 5</li>
            <li className="cursor-pointer p-[2px]">Astro Boy</li>
            <li className="cursor-pointer p-[2px]">Baby Yoda</li>
            <li className="cursor-pointer p-[2px]">Bill & Ted</li>
            <li className="cursor-pointer p-[2px]">Owl</li>
          </ul>
        </div>
        <div className='circular-cursor absolute'></div>
      </>
    </>
  );
}

export default App;
