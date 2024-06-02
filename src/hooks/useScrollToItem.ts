import { RefObject, useEffect } from "react";
import { Message } from "../types";

export const useScrollToLastMessage = (
  messagesEndRef: RefObject<HTMLElement>,
  messages: Message[]
) => {
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
};
