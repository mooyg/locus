// the v2 config imports the css driver on web and react-native on native

// for reanimated: @tamagui/config/v2-reanimated

// for react-native only: @tamagui/config/v2-native

import { config } from "@tamagui/config/v2-native";
import { color, radius, size, space, zIndex } from "@tamagui/themes";
import { createTamagui, createTokens } from "tamagui";

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
});
// this makes typescript properly type everything based on the config

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
export default tamaguiConfig;
// depending on if you chose tamagui, @tamagui/core, or @tamagui/web

// be sure the import and declare module lines both use that same name
