import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "../types";
import { generateUUID } from "../services/generateUUID";

export const useSocket = (userName: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectedClients, setConnectedClients] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  function updateMessages(value: Message) {
    setMessages((state) => {
      const temp = [...state];
      temp.push(value);
      return temp;
    });
  }

  function connectToSocket() {
    const URL = import.meta.env.VITE_SOCKET_HOST!;
    const newSocket = io(URL);
    setSocket(newSocket);

    function onConnect() {
      setIsConnected(true);
      newSocket.emit("connected-user", userName);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function receiveMessage(value: Message) {
      updateMessages(value);
    }

    function connectedClients(value: number) {
      setConnectedClients(value);
    }

    function newUser(value: string) {
      const temp: Message = {
        id: generateUUID(),
        sender: value,
        senderId: "",
        text: "",
        time: new Date(),
        type: "notification",
      };
      updateMessages(temp);
    }

    newSocket.on("connect", onConnect);
    newSocket.on("disconnect", onDisconnect);
    newSocket.on("new-message", receiveMessage);
    newSocket.on("connected-clients", connectedClients);
    newSocket.on("new-user", newUser);
  }

  useEffect(() => {
    if (userName) {
      connectToSocket();
    }
  }, [userName]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("new-message");
        socket.off("connected-clients");
      }
    };
  }, []);

  return {
    messages,
    isConnected,
    connectedClients,
    socket,
    updateMessages,
  };
};
