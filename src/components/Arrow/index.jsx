import React from "react";

const Arrow = ({ isAtBottom, scrollToBottom, unReadCount }) => {
  return (
    !isAtBottom && (
      <button
        onClick={scrollToBottom}
        className="sticky bottom-0 end-0 ml-auto bg-zinc-300 p-2 rounded-lg hover:bg-zinc-400 transition cursor-pointer shadow-black/50 shadow-md"
      >
        {unReadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ">
            {unReadCount}
          </span>
        )}
        <img src="/arrow.svg" alt="arrow" className="w-3" />
      </button>
    )
  );
};

export default Arrow;
