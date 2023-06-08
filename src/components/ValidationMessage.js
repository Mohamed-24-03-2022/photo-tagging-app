import React from 'react';

const ValidationMessage = ({ selectedCharacter }) => {
  const titleCase = (string) => {
    return string.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
      return str.toUpperCase();
    });
  };
  return (
    <div className="validation-message absolute flex w-[300px] items-center justify-center rounded-md p-4 px-8 font-serif text-[#fff] transition-all">
      <p>You've found: {titleCase(selectedCharacter)}</p>
    </div>
  );
};

export default ValidationMessage;
