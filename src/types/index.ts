export type Message = {
  text: string;
  sender: string;
  id: string;
  time: Date;
  senderId: string;
  type: "message" | "notification";
};
