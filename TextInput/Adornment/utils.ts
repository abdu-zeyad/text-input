type BaseProps = {
  disabled?: boolean;
};

export function getTextColor({ disabled }: BaseProps) {
  return "black";
}

export function getIconColor({
  isTextInputFocused,
  disabled,
  customColor,
}: BaseProps & {
  isTextInputFocused: boolean;
  customColor?: ((isTextInputFocused: boolean) => string | undefined) | string;
}) {
  return "blue";
}
