import { PropsWithChildren } from "react";

export const ChatBubble = (
  props: PropsWithChildren<{
    sender: string;
    text: string;
    time: Date;
    dir: "left" | "right";
  }>
) => {
  const { text, time, dir, sender } = props;

  function timeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 5) {
      return "Now";
    } else if (seconds < 60) {
      return `${seconds} s`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} m`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} h`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} d`;
    }
  }

  if (dir === "right") {
    return (
      <div className="w-fit self-end flex flex-col">
        <div className="bg-pink-500 text-xs text-center w-14 self-end">
          <p>{timeAgo(new Date(time))}</p>
        </div>
        <div className="bg-neutral-200 p-2 text-black base-shadow text-sm font-semibold font-mono border-white border-2">
          <p className="line-break">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-fit">
      <div className="bg-pink-500 text-xs text-center w-14 self-end">
        <p>{timeAgo(new Date(time))}</p>
      </div>
      <div className="bg-blue-200 p-2 text-black base-shadow text-sm font-semibold font-mono border-white border-2">
        <p className="line-break">{text}</p>
      </div>
      <p className="text-xs pt-1">{sender}</p>
    </div>
  );
};
