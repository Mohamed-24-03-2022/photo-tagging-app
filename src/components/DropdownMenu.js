import React, { useEffect } from 'react';
import { db } from '../firebaseInitializer';
import { getDoc, doc } from 'firebase/firestore';
import CharacterBtn from './CharacterBtn';

const getCharactersCoordinates = async () => [
  await getDoc(doc(db, 'charactersCoordinates', 'astroBoy')),
  await getDoc(doc(db, 'charactersCoordinates', 'owl')),
  await getDoc(doc(db, 'charactersCoordinates', 'alpha')),
  await getDoc(doc(db, 'charactersCoordinates', 'billAndTed')),
  await getDoc(doc(db, 'charactersCoordinates', 'babyYoda')),
];

const DropdownMenu = ({
  isVisible,
  setIsVisible,
  clickCoordinatesRef,
  characters,
  setCharacters,
  camelize,
  setDidUserGetItRightForParent,
  setSelectedCharacter,
}) => {
  useEffect(() => {
    getCharactersCoordinates()
      .then((data) => {
        setCharacters([
          { name: 'astroBoy', coord: data[0].data(), isClicked: false },
          { name: 'owl', coord: data[1].data(), isClicked: false },
          { name: 'alpha', coord: data[2].data(), isClicked: false },
          { name: 'billAndTed', coord: data[3].data(), isClicked: false },
          { name: 'babyYoda', coord: data[4].data(), isClicked: false },
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  const indexOf = (characterName) => {
    let targetIndex = -1;
    for (let i = 0; i < characters.length; i++) {
      if (characters[i].name === characterName) {
        targetIndex = i;
        break;
      }
    }
    return targetIndex;
  };

  const checkClick = (character) => {
    const { clickedX, clickedY } = clickCoordinatesRef.current;
    const { coord } = character;
    if (coord.x1 <= clickedX && clickedX <= coord.x2) {
      if (coord.y1 <= clickedY && clickedY <= coord.y2) {
        return true;
      }
    }
    return false;
  };

  const handleClick = (e) => {
    setIsVisible(!isVisible);
    const selectedCharacter = camelize(e.target.textContent);
    const didUserGotItRight = checkClick(
      characters[indexOf(selectedCharacter)]
    );
    setSelectedCharacter(selectedCharacter);
    setDidUserGetItRightForParent(didUserGotItRight);

    if (didUserGotItRight) {
      const newList = characters.map((character) =>
        character.name === selectedCharacter
          ? { ...character, isClicked: true }
          : character
      );
      setCharacters(newList);
    }
  };

  return (
    <>
      <div
        id="drop-down-menu"
        className={`menu-position absolute w-[160px] border border-solid bg-white ${!isVisible ? 'hidden' : ''
          }`}
      >
        <ul>
          <CharacterBtn
            characters={characters}
            characterName={'Astro Boy'}
            i={0}
            img={null}
            handleClick={handleClick}
          />
          <CharacterBtn
            characters={characters}
            characterName={'Owl'}
            i={1}
            img={null}
            handleClick={handleClick}
          />
          <CharacterBtn
            characters={characters}
            characterName={'Alpha 5'}
            i={2}
            img={null}
            handleClick={handleClick}
          />
          <CharacterBtn
            characters={characters}
            characterName={'Bill & Ted'}
            i={3}
            img={null}
            handleClick={handleClick}
          />
          <CharacterBtn
            characters={characters}
            characterName={'Baby Yoda'}
            i={4}
            img={null}
            handleClick={handleClick}
          />
        </ul>
      </div>
      <div className="circular-cursor absolute"></div>
    </>
  );
};

export default DropdownMenu;
