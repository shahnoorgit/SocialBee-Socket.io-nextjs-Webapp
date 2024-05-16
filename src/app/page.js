"use client";
import Card from "@/components/Card";
import useFetchPost from "@/Hooks/useFetchPost";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const { data: session } = useSession();
  const [counter, setCounter] = useState(0);
  const [socket, setSocket] = useState(null);
  const { loading, fetchPost } = useFetchPost();
  const [post, setPost] = useState([]);

  useEffect(() => {
    // Establish Socket.io connection
    fetchPost().then((data) => setPost(data));
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // Listen for counter updates from the server
    newSocket.on("counter", (updatedCounter) => {
      setCounter(updatedCounter);
    });

    // Clean up function to disconnect from Socket.io server
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleButtonClick = () => {
    if (socket) {
      // Emit button click event to the server
      socket.emit("buttonClick");
      console.log("Button clicked, event emitted.");
    } else {
      console.error("Socket is not initialized.");
    }
  };

  console.log(post);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={handleButtonClick}>Press me!</button>
      {post.map((post) => (
        <Card post={post} />
      ))}
    </div>
  );
}
