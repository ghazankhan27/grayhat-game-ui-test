import { useEffect, useState } from "react";

export const useNewDate = () => {
  const [, setNow] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 30000);
  }, []);
};
