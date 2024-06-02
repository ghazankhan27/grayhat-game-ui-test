import { useButton } from "@mui/base/useButton";
import { PropsWithChildren, ReactElement, useState } from "react";

export default function MyButton(
  props: PropsWithChildren<{
    type?: string;
    icon?: ReactElement;
    iconActive?: ReactElement;
    iconHover?: ReactElement;
  }>
) {
  const { children, type, icon, iconActive, iconHover } = props;
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

  const getClass = () => {
    const base = `func-button text-sm px-3 py-1 font-semibold`;
    const baseClass = `base-button`;
    const activeClass = `base-button-active`;
    const shadowClass = `base-shadow`;
    if (active) {
      return `${base} ${activeClass}`;
    }
    return `${base} ${shadowClass} ${baseClass}`;
  };

  if (type === "icon") {
    return (
      <button
        className={getClass()}
        type="button"
        {...getRootProps({
          onMouseEnter: () => setHover(true),
          onMouseLeave: () => setHover(false),
        })}
        onClick={() => setActive(!active)}
      >
        <div>
          <Icon />
        </div>
      </button>
    );
  }

  return (
    <button
      className={getClass()}
      type="button"
      {...getRootProps()}
      onClick={() => setActive(!active)}
    >
      {children}
    </button>
  );
}
