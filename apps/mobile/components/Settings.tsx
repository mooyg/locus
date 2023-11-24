import { Heading, YStack } from "tamagui";
import { SavedPlaces } from "./SavedPlaces";

export const Settings = () => {
  return (
    <YStack gap="$4">
      <SavedPlaces />
    </YStack>
  );
};
