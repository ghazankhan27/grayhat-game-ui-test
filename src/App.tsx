import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import MyButton from "./components/MyButton";
import MyChatInput from "./components/MyChatInput";
import { ChatBubble } from "./components/ChatBubble";
import { generateUUID } from "./services/generateUUID";
import { socket } from "./socket";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function receiveMessage(value: Message) {
      if (value.sender === userName) {
        console.log("yes");
        return;
      }

      setMessages((state) => {
        const temp = [...state];
        temp.push(value);
        return temp;
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("new-message", receiveMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  type Message = {
    text: string;
    sender: string;
    id: string;
    time: Date;
  };

  const [messages, setMessages] = useState<Message[]>([]);

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as { message: string };

    if (!data.message) {
      return;
    }

    const id = generateUUID();
    const time = new Date();

    const messageItem = {
      text: data.message,
      sender: userName,
      id: id,
      time: time,
    };

    socket.emit("message", messageItem);
    form.reset();
  }

  function submitName(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as { myname: string };

    if (!data.myname) {
      return;
    }

    setUserName(data.myname);

    form.reset();
  }

  if (!userName) {
    return (
      <div className="flex flex-col gap-y-2 justify-center items-center w-screen h-screen text-black font-bold text-xl">
        <form onSubmit={submitName}>
          <p>What is your name?</p>
          <MyChatInput name="myname" />
        </form>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex justify-center items-center w-screen h-screen animate-pulse text-black font-bold text-xl">
        <p>Connection To Server...</p>
      </div>
    );
  }

  return (
    <div id="container">
      <div className="h-full flex flex-col w-full md:w-4/5 lg:w-1/2 m-auto relative">
        <div id="chat-area" className="w-full">
          {messages.map((m) => {
            const check = userName === m.sender;
            return (
              <ChatBubble
                sender={m.sender}
                text={m.text}
                time={m.time}
                key={m.id}
                dir={check ? "right" : "left"}
              />
            );
          })}
        </div>
        <div className="flex gap-x-6 absolute right-0">
          <MyButton>Online (42)</MyButton>
        </div>
        <div>
          <form onSubmit={sendMessage}>
            <div className="w-full">
              <MyChatInput name="message" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
