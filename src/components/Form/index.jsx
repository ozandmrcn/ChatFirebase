import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";
import { db } from "../../firebase";
import EmojiPicker from "emoji-picker-react";

const Form = ({ user, room }) => {
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const emojiPickerRef = useRef(null);
  const buttonRef = useRef(null);

  // Close the emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !emojiPickerRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear the input field and close the emoji picker
    setIsOpen(false);
    setText("");

    // Reference to the messages collection
    const collectionRef = collection(db, "messages");

    await addDoc(collectionRef, {
      text,
      room,
      author: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      createdAt: serverTimestamp(),
    });
  };

  const handleEmojiClick = (e) => {
    const input = document.querySelector("input[type='text']");

    if (input) {
      // Get the position of the cursor
      const start = input.selectionStart;
      const end = input.selectionEnd;

      // Replace the text with the emoji
      setText(text.substring(0, start) + e.emoji + text.substring(end));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 border border-gray-200 shadow-lg flex justify-center gap-3"
    >
      <input
        value={text}
        type="text"
        className="border border-gray-200 shadow-sm p-2 px-4 rounded-md w-1/2 "
        onChange={(e) => setText(e.target.value)}
        placeholder="write your message..."
      />

      <div className="relative">
        {isOpen && (
          <div
            className="absolute top-[-470px] right-[-140px]"
            ref={emojiPickerRef}
          >
            <EmojiPicker
              open={isOpen}
              theme="dark"
              onEmojiClick={handleEmojiClick}
            />
          </div>
        )}

        <button
          ref={buttonRef}
          type="button"
          className="btn text-base"
          onClick={() => setIsOpen(!isOpen)}
        >
          🤔
        </button>
      </div>

      <button
        type="submit"
        className="btn bg-zinc-700 text-white px-4 py-2 rounded-md disabled:brightness-75"
        disabled={text.length < 1}
      >
        Send
      </button>
    </form>
  );
};

export default Form;
