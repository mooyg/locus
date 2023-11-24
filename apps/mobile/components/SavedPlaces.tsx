import { Heading, Stack, Text, XStack, YStack } from "tamagui";

export const SavedPlaces = () => {
  return (
    <YStack gap="$2">
      <Heading color="$color.text-primary">Saved Places</Heading>
      <Stack
        borderRadius="$4"
        padding="$2"
        borderWidth="$1"
        borderColor="$color.btn-secondary"
      >
        <XStack>
          <Text color="$color.text-secondary" fontWeight="900" fontSize="$7">
            Home
          </Text>
        </XStack>
      </Stack>
    </YStack>
  );
};
