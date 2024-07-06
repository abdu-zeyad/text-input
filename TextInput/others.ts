type Mode = "adaptive" | "exact";

export type ThemeBase = {
  dark: boolean;
  mode?: Mode;
  roundness: number;
  animation: {
    scale: number;
    defaultAnimationDuration?: number;
  };
};
export enum ElevationLevels {
  "level0",
  "level1",
  "level2",
  "level3",
  "level4",
  "level5",
}

export type MD3ElevationColors = {
  [key in keyof typeof ElevationLevels]: string;
};

export type MD3Colors = {
  primary: string;
  primaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  surface: string;
  surfaceVariant: string;
  surfaceDisabled: string;
  background: string;
  error: string;
  errorContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;
  onSecondary: string;
  onSecondaryContainer: string;
  onTertiary: string;
  onTertiaryContainer: string;
  onSurface: string;
  onSurfaceVariant: string;
  onSurfaceDisabled: string;
  onError: string;
  onErrorContainer: string;
  onBackground: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  shadow: string;
  scrim: string;
  backdrop: string;
  elevation: MD3ElevationColors;
};
// MD3 types
export enum MD3TypescaleKey {
  displayLarge = "displayLarge",
  displayMedium = "displayMedium",
  displaySmall = "displaySmall",

  headlineLarge = "headlineLarge",
  headlineMedium = "headlineMedium",
  headlineSmall = "headlineSmall",

  titleLarge = "titleLarge",
  titleMedium = "titleMedium",
  titleSmall = "titleSmall",

  labelLarge = "labelLarge",
  labelMedium = "labelMedium",
  labelSmall = "labelSmall",

  bodyLarge = "bodyLarge",
  bodyMedium = "bodyMedium",
  bodySmall = "bodySmall",
}
export type Font = {
  fontFamily: string;
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  fontStyle?: "normal" | "italic" | undefined;
};

export type MD3Type = {
  fontFamily: string;
  letterSpacing: number;
  fontWeight: Font["fontWeight"];
  lineHeight: number;
  fontSize: number;
  fontStyle?: Font["fontStyle"];
};
export type MD3Typescale =
  | {
      [key in MD3TypescaleKey]: MD3Type;
    } & {
      ["default"]: Omit<MD3Type, "lineHeight" | "fontSize">;
    };
export type MD3Theme = ThemeBase & {
  version: 3;
  isV3: true;
  colors: MD3Colors;
  fonts: MD3Typescale;
};

export type InternalTheme = MD3Theme;

const light: MD3Colors = {
  primary: "rgb(120, 69, 172)",
  onPrimary: "rgb(255, 255, 255)",
  primaryContainer: "rgb(240, 219, 255)",
  onPrimaryContainer: "rgb(44, 0, 81)",
  secondary: "rgb(102, 90, 111)",
  onSecondary: "rgb(255, 255, 255)",
  secondaryContainer: "rgb(237, 221, 246)",
  onSecondaryContainer: "rgb(33, 24, 42)",
  tertiary: "rgb(128, 81, 88)",
  onTertiary: "rgb(255, 255, 255)",
  tertiaryContainer: "rgb(255, 217, 221)",
  onTertiaryContainer: "rgb(50, 16, 23)",
  error: "rgb(186, 26, 26)",
  onError: "rgb(255, 255, 255)",
  errorContainer: "rgb(255, 218, 214)",
  onErrorContainer: "rgb(65, 0, 2)",
  background: "rgb(255, 251, 255)",
  onBackground: "rgb(29, 27, 30)",
  surface: "rgb(255, 251, 255)",
  onSurface: "rgb(29, 27, 30)",
  surfaceVariant: "rgb(233, 223, 235)",
  onSurfaceVariant: "rgb(74, 69, 78)",
  outline: "rgb(124, 117, 126)",
  outlineVariant: "rgb(204, 196, 206)",
  shadow: "rgb(0, 0, 0)",
  scrim: "rgb(0, 0, 0)",
  inverseSurface: "rgb(50, 47, 51)",
  inverseOnSurface: "rgb(245, 239, 244)",
  inversePrimary: "rgb(220, 184, 255)",
  elevation: {
    level0: "transparent",
    level1: "rgb(248, 242, 251)",
    level2: "rgb(244, 236, 248)",
    level3: "rgb(240, 231, 246)",
    level4: "rgb(239, 229, 245)",
    level5: "rgb(236, 226, 243)",
  },
  surfaceDisabled: "rgba(29, 27, 30, 0.12)",
  onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
  backdrop: "rgba(51, 47, 55, 0.4)",
};

const dark = {
  colors: {
    primary: "rgb(220, 184, 255)",
    onPrimary: "rgb(71, 12, 122)",
    primaryContainer: "rgb(95, 43, 146)",
    onPrimaryContainer: "rgb(240, 219, 255)",
    secondary: "rgb(208, 193, 218)",
    onSecondary: "rgb(54, 44, 63)",
    secondaryContainer: "rgb(77, 67, 87)",
    onSecondaryContainer: "rgb(237, 221, 246)",
    tertiary: "rgb(243, 183, 190)",
    onTertiary: "rgb(75, 37, 43)",
    tertiaryContainer: "rgb(101, 58, 65)",
    onTertiaryContainer: "rgb(255, 217, 221)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(29, 27, 30)",
    onBackground: "rgb(231, 225, 229)",
    surface: "rgb(29, 27, 30)",
    onSurface: "rgb(231, 225, 229)",
    surfaceVariant: "rgb(74, 69, 78)",
    onSurfaceVariant: "rgb(204, 196, 206)",
    outline: "rgb(150, 142, 152)",
    outlineVariant: "rgb(74, 69, 78)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(231, 225, 229)",
    inverseOnSurface: "rgb(50, 47, 51)",
    inversePrimary: "rgb(120, 69, 172)",
    elevation: {
      level0: "transparent",
      level1: "rgb(39, 35, 41)",
      level2: "rgb(44, 40, 48)",
      level3: "rgb(50, 44, 55)",
      level4: "rgb(52, 46, 57)",
      level5: "rgb(56, 49, 62)",
    },
    surfaceDisabled: "rgba(231, 225, 229, 0.12)",
    onSurfaceDisabled: "rgba(231, 225, 229, 0.38)",
    backdrop: "rgba(51, 47, 55, 0.4)",
  },
};

const theme: InternalTheme = {
  colors: light,
  dark: false,
  mode: "adaptive",
  roundness: 5,
  animation: {
    scale: 1,
    defaultAnimationDuration: 100,
  },
  version: 3,
  isV3: true,
  fonts: {
    displaySmall: {
      fontFamily: "Font",
      fontSize: 36,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 44,
    },
    displayMedium: {
      fontFamily: "Font",
      fontSize: 45,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 52,
    },
    displayLarge: {
      fontFamily: "Font",
      fontSize: 57,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 64,
    },
    headlineSmall: {
      fontFamily: "Font",
      fontSize: 24,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 32,
    },
    headlineMedium: {
      fontFamily: "Font",
      fontSize: 28,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 36,
    },
    headlineLarge: {
      fontFamily: "Font",
      fontSize: 32,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 40,
    },
    titleSmall: {
      fontFamily: "Font",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    titleMedium: {
      fontFamily: "Font",
      fontSize: 16,
      fontWeight: "500",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    titleLarge: {
      fontFamily: "Font",
      fontSize: 22,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 28,
    },
    labelSmall: {
      fontFamily: "Font",
      fontSize: 11,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelMedium: {
      fontFamily: "Font",
      fontSize: 12,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelLarge: {
      fontFamily: "Font",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    bodySmall: {
      fontFamily: "Font",
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 0.4,
      lineHeight: 16,
    },
    bodyMedium: {
      fontFamily: "Font",
      fontSize: 14,
      fontWeight: "400",
      letterSpacing: 0.25,
      lineHeight: 20,
    },
    bodyLarge: {
      fontFamily: "Font",
      fontSize: 16,
      fontWeight: "400",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    default: {
      fontFamily: "FontFamily",
      fontWeight: "400",
      letterSpacing: 0,
    },
  },
};

export const useInternalTheme = (themeOverrides: any) => {
  return theme;
};
