import React from 'react';

const WhatToFindMenu = () => {
  return (
    <>
      <p className="px-4 py-1 text-xl font-bold">Find</p>
      <div className="h-[1.5px] w-full bg-[#333]"></div>
      <ul>
        <button
          type="button"
          className="w-full rounded-l px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
        >
          <li>Alpha 5</li>
        </button>
        <button
          type="button"
          className="w-full rounded-l px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
        >
          <li>Astro Boy</li>
        </button>
        <button
          type="button"
          className="w-full rounded-l px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
        >
          <li>Baby Yoda</li>
        </button>
        <button
          type="button"
          className="w-full rounded-l px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
        >
          <li>Bill & Ted</li>
        </button>
        <button
          type="button"
          className="w-full rounded-l px-4 py-2 text-left text-gray-800 hover:bg-gray-200"
        >
          <li>Owl</li>
        </button>
      </ul>
    </>
  );
};

export default WhatToFindMenu;
