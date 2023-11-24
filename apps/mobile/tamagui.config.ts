// the v2 config imports the css driver on web and react-native on native

// for reanimated: @tamagui/config/v2-reanimated

// for react-native only: @tamagui/config/v2-native

import { config } from "@tamagui/config/v2-native";
import { color, radius, size, space, zIndex } from "@tamagui/themes";
import { createFont, createTamagui, createTokens } from "tamagui";
const sfProFace = {
  normal: {
    normal: "SF-Pro-Display-Regular",
    italic: "SF-Pro-Text-RegularItalic",
  },
  bold: {
    normal: "SF-Pro-Display-Bold",
    italic: "SF-Pro-Display-BoldItalic",
  },
  300: {
    normal: "SF-Pro-Display-Light",
    italic: "SF-Pro-Display-LightItalic",
  },
  500: {
    normal: "SF-Pro-Display-Regular",
    italic: "SF-Pro-Display-RegularItalic",
  },
  600: {
    normal: "SF-Pro-Display-Medium",
    italic: "SF-Pro-Display-MediumItalic",
  },
  700: {
    normal: "SF-Pro-Display-Bold",
    italic: "SF-Pro-Display-BoldItalic",
  },
  800: {
    normal: "SF-Pro-Display-Bold",
    italic: "SF-Pro-Display-BoldItalic",
  },
  900: {
    normal: "SF-Pro-Display-Black",
    italic: "SF-Pro-Display-BlackItalic",
  },
};
const headingFont = createFont({
  size: config.fonts.heading.size,
  weight: config.fonts.heading.weight,
  face: sfProFace,
});

const bodyFont = createFont({
  size: config.fonts.body.size,
  weight: config.fonts.body.weight,
  face: sfProFace,
});
const tokens = createTokens({
  color: {
    "bg-primary": "#0D1E2B",
    "btn-primary": "#2D598B",
    "btn-secondary": "#5790D1",
    "text-primary": "#769FCD",
    "text-secondary": "#9EBACB",
    ...color,
  },
  radius,
  size,
  space,
  zIndex,
});
const tamaguiConfig = createTamagui({
  ...config,
  tokens,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
});
// this makes typescript properly type everything based on the config

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
export default tamaguiConfig;
// depending on if you chose tamagui, @tamagui/core, or @tamagui/web

// be sure the import and declare module lines both use that same name
