import { useButton } from "@mui/base/useButton";
import { PropsWithChildren, ReactElement, useState } from "react";

export default function MyIconButton(
  props: PropsWithChildren<{
    icon?: ReactElement;
    iconActive?: ReactElement;
    iconHover?: ReactElement;
  }>
) {
  const { icon, iconActive, iconHover } = props;
  const { getRootProps } = useButton({});
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const Icon = () => {
    if (active) {
      return iconActive;
    }

    if (hover) {
      return iconHover;
    }

    return icon;
  };

  return (
    <button
      className={`bg-yellow-300 outline-3 outline text-black font-semibold px-6 py-2 ${
        active
          ? "bg-black text-white outline-black"
          : "hover:bg-white outline-white base-shadow"
      }`}
      type="button"
      {...getRootProps({
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
      })}
      onClick={() => setActive(!active)}
    >
      <Icon />
    </button>
  );
}
