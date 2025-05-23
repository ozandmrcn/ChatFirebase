import { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import Message from "../Message";
import Arrow from "../Arrow";
const List = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const lastMessageRef = useRef(null);
  const containerRef = useRef(null);
  const [unReadCount, setUnReadCount] = useState(0);
  const prevMessagesLenght = useRef(0);
  const audioRef = useRef(new Audio("/notify.mp3"));

  // Get the messages from the database
  useEffect(() => {
    // Get the collection reference
    const collectionRef = collection(db, "messages");

    // Query settings
    const q = query(
      collectionRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // Get the snapshot of the collection (updates when a new message is added)
    const unsub = onSnapshot(q, (snapshot) => {
      // Create a temporary array to store the messages
      const temp = [];

      // Loop through the snapshot and push the messages to the temporary array
      snapshot.docs.forEach((doc) => {
        temp.push(doc.data());
      });

      // Set the messages to the state
      setMessages(temp);
    });

    // Return a cleanup function
    return () => unsub();
  }, []);

  // Scroll to the bottom of the list when a new message is added
  useEffect(() => {
    if (messages.length > 1) {
      const lastMessage = messages[messages.length - 1];

      // If a new message is added and the user is not at the bottom of the list
      if (messages.length > prevMessagesLenght.current && !isAtBottom) {
        // If the last message is from the other user, increment the unread count
        if (lastMessage.author.id !== auth.currentUser.uid) {
          setUnReadCount((prev) => prev + 1);
        }
      }

      // If the last message is from the current user, scroll to it
      if (lastMessage.author.id === auth.currentUser.uid) {
        scrollToBottom();
      } else if (isAtBottom) {
        // If the last message is from the other user, scroll to it
        scrollToBottom();

        // If the last message is from the other user and the user is at the bottom of the list, play the audio notification
        if (messages.length > prevMessagesLenght.current) {
          playAudio();
        }
      }
    }
  }, [messages]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 100);
  };

  // Scroll to the bottom of the list
  const scrollToBottom = () => {
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isAtBottom) {
      setUnReadCount(0);
    }
  }, [isAtBottom]);

  // Audio notification for new messages
  const playAudio = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <main
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 p-3 flex flex-col gap-3 w-full overflow-y-auto relative"
    >
      {messages.length < 1 ? (
        <div className="h-full grid place-items-center text-zinc-400">
          <p>No messages so far, you will be the first !</p>
        </div>
      ) : (
        messages.map((i, key) => <Message item={i} key={key} />)
      )}

      <div ref={lastMessageRef} />

      <Arrow
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        unReadCount={unReadCount}
      />
    </main>
  );
};

export default List;
