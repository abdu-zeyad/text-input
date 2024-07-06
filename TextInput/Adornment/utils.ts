import type { InternalTheme } from "../others";

type BaseProps = {
  theme: InternalTheme;
  disabled?: boolean;
};

export function getTextColor({ theme, disabled }: BaseProps) {
  if (theme.isV3) {
    if (disabled) {
      return theme.colors.onSurfaceDisabled;
    }
    return theme.colors.onSurfaceVariant;
  }
  return theme.colors?.text;
}

export function getIconColor({
  theme,
  isTextInputFocused,
  disabled,
  customColor,
}: BaseProps & {
  isTextInputFocused: boolean;
  customColor?: ((isTextInputFocused: boolean) => string | undefined) | string;
}) {
  if (typeof customColor === "function") {
    return customColor(isTextInputFocused);
  }
  if (customColor) {
    return customColor;
  }

  if (!theme.isV3) {
    return theme.colors.text;
  }

  if (disabled) {
    return theme.colors.onSurfaceDisabled;
  }

  return theme.colors.onSurfaceVariant;
}
