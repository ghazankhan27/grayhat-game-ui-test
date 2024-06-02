import * as React from "react";
import { useInput } from "@mui/base/useInput";
import { unstable_useForkRef as useForkRef } from "@mui/utils";

const CustomInput = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { getInputProps } = useInput(props);

  const inputProps = getInputProps();

  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <div className="relative flex items-center">
      <input
        id="chat-input"
        className="bg-white base-shadow text-black p-2 outline-none triangle"
        {...props}
        {...inputProps}
      />
      <button type="submit" className="text-black absolute right-0 h-full px-4">
        <i className="fa fa-right-long" />
      </button>
    </div>
  );
});

export default function MyChatInput(
  props: React.PropsWithChildren<{
    name: string;
  }>
) {
  return <CustomInput {...props} />;
}
