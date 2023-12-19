import { useToastState, Toast as TamaguiToast } from "@tamagui/toast";
import { YStack } from "tamagui";

export const Toast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <TamaguiToast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
      backgroundColor="$color.bg-primary"
      borderColor="$text-secondary"
      bordered={true}
      borderRadius="$3"
      padding="$4"
    >
      <YStack>
        <TamaguiToast.Title
          fontSize="$5"
          fontWeight="bold"
          color="$text-primary"
        >
          {currentToast.title}
        </TamaguiToast.Title>
        {!!currentToast.message && (
          <TamaguiToast.Description>
            {currentToast.message}
          </TamaguiToast.Description>
        )}
      </YStack>
    </TamaguiToast>
  );
};
