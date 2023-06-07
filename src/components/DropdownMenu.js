import React, { useEffect, useRef } from 'react';
import { db } from '../firebaseInitializer';
import {
  getDoc,
  doc,
} from 'firebase/firestore';

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return '';
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

const getCharactersCoordinates = async () => [
  await getDoc(doc(db, 'charactersCoordinates', 'astroBoy')),
  await getDoc(doc(db, 'charactersCoordinates', 'owl')),
  await getDoc(doc(db, 'charactersCoordinates', 'alpha')),
  await getDoc(doc(db, 'charactersCoordinates', 'billAndTed')),
  await getDoc(doc(db, 'charactersCoordinates', 'babyYoda')),
];

const DropdownMenu = ({ isVisible, setIsVisible, clickCoordinatesRef }) => {
  const characters = useRef({});

  useEffect(() => {
    getCharactersCoordinates()
      .then((data) => {
        characters.current = {
          astroBoy: data[0],
          owl: data[1],
          alpha: data[2],
          billAndTed: data[3],
          babyYoda: data[4],
        };
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = async (e) => {
    setIsVisible(!isVisible);
    const selectedCharacter = camelize(e.target.textContent)
      .replace('&', 'And')
      .replace('5', '');
    const { clickedX, clickedY } = clickCoordinatesRef.current;

    // const { astroBoy, owl, alpha, billAndTed, babyYoda } = characters.current;
    // console.log(clickedX, clickedY);

    const checkClick = (character) => {
      if (character.data().x1 <= clickedX && clickedX <= character.data().x2) {
        if (character.data().y1 <= clickedY && clickedY <= character.data().y2) {
          return true;
        }
      }
      return false;
    };

    const didUserGotItRight = checkClick(characters.current[selectedCharacter]);
    console.log(didUserGotItRight);
  };

  return (
    <>
      <div
        id="drop-down-menu"
        className={`menu-position absolute w-[160px] border border-solid bg-white ${!isVisible ? 'hidden' : ''
          }`}
      >
        <ul>
          <button
            onClick={handleClick}
            type="button"
            className="w-full rounded-l px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
          >
            <li>Alpha 5</li>
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="w-full rounded-l px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
          >
            <li>Astro Boy</li>
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="w-full rounded-l px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
          >
            <li>Baby Yoda</li>
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="w-full rounded-l px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
          >
            <li>Bill & Ted</li>
          </button>
          <button
            onClick={handleClick}
            type="button"
            className="w-full rounded-l px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
          >
            <li>Owl</li>
          </button>
        </ul>
      </div>
      <div className="circular-cursor absolute"></div>
    </>
  );
};

export default DropdownMenu;
