import React from 'react';
import CharacterBtn from './CharacterBtn';
import astroImg from '../assets/Astro.png';
import owlImg from '../assets/Owl.jpg';
import alphaImg from '../assets/Alpha_5.png';
import billAndTedImg from '../assets/Bill_and_Ted.jpg';
import babyYodaImg from '../assets/Baby_Yoda.jpg';

const WhatToFindMenu = ({ characters }) => {
  return (
    <>
      <p className="px-6 py-2 text-xl font-bold">Find</p>
      <div className="h-[1.5px] w-full bg-[#333]"></div>
      <ul>
        <CharacterBtn
          characters={characters}
          characterName={'Astro Boy'}
          i={0}
          img={astroImg}
        />
        <CharacterBtn
          characters={characters}
          characterName={'Owl'}
          i={1}
          img={owlImg}
        />
        <CharacterBtn
          characters={characters}
          characterName={'Alpha 5'}
          i={2}
          img={alphaImg}
        />
        <CharacterBtn
          characters={characters}
          characterName={'Bill & Ted'}
          i={3}
          img={billAndTedImg}
        />
        <CharacterBtn
          characters={characters}
          characterName={'Baby Yoda'}
          i={4}
          img={babyYodaImg}
        />
      </ul>
    </>
  );
};

export default WhatToFindMenu;
