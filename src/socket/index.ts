import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Message } from "../types";

const URL = import.meta.env.VITE_SOCKET_HOST!;

const socket = io(URL);

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectedClients, setConnectedClients] = useState(0);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function receiveMessage(value: Message) {
      setMessages((state) => {
        const temp = [...state];
        temp.push(value);
        return temp;
      });
    }

    function connectedClients(value: number) {
      setConnectedClients(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("new-message", receiveMessage);
    socket.on("connected-clients", connectedClients);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return {
    messages,
    isConnected,
    connectedClients,
    socket,
  };
};
