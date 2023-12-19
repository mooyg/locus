import { Plus } from "@tamagui/lucide-icons";
import { api } from "../client";
import { useEffect, useState } from "react";
import {
  Adapt,
  Button,
  Dialog,
  Form,
  Heading,
  Input,
  Sheet,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { useToastController } from "@tamagui/toast";

export const CreateFamily = () => {
  const toast = useToastController();
  const [open, setOpen] = useState(false);
  const [familyName, setFamilyName] = useState("");
  const [formError, setFormError] = useState<string | null>("");
  const {
    mutate: createFamily,
    isSuccess,
    isError,
  } = api.family.createFamily.useMutation();

  useEffect(() => {
    if (isSuccess) {
      setFamilyName("");
      setOpen(false);
      setFormError(null);
      toast.show("Created family");
    }
    if (isError) {
      setFormError("Some error occured while creating the family");
    }
  }, [isSuccess, isError]);

  return (
    <Dialog
      onOpenChange={(open) => {
        setOpen(open);
      }}
      open={open}
    >
      <Dialog.Trigger asChild>
        <Button
          backgroundColor="$color.btn-primary"
          borderRadius="$12"
          size="$5"
          circular
        >
          <Plus size={24} color="$color.text-secondary" />
        </Button>
      </Dialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet
          snapPointsMode="fit"
          animation="medium"
          zIndex={200000}
          modal
          dismissOnSnapToBottom
        >
          <Sheet.Frame
            padding="$4"
            paddingBottom="$8"
            gap="$4"
            bg="$color.bg-primary"
          >
            <Heading color="$color.text-primary" fontSize="$9">
              Create Family
            </Heading>
            <Form
              onSubmit={() => {
                if (familyName.length === 0) {
                  setFormError("Family name doesn't exist");
                  return;
                }
                createFamily({
                  name: familyName,
                });
              }}
              gap="$5"
            >
              <YStack gap="$3">
                <YStack gap="$2">
                  <Heading color="$text-secondary">Name</Heading>
                  <Input
                    bg="$color.btn-primary"
                    placeholder="Enter your family name"
                    fontSize="$7"
                    fontWeight="bold"
                    color="white"
                    placeholderTextColor="text-secondary"
                    value={familyName}
                    onChangeText={(e) => {
                      setFamilyName(e);
                    }}
                  />
                </YStack>
                <YStack gap="$2">
                  <Heading color="$text-secondary">Members</Heading>
                  <XStack gap="$2" alignItems="center">
                    <Input
                      bg="$color.btn-primary"
                      placeholder="Enter family members email"
                      fontSize="$7"
                      fontWeight="bold"
                      color="white"
                      placeholderTextColor="text-secondary"
                      flex={1}
                    />
                    <Button
                      borderColor="$color.btn-primary"
                      borderWidth={"$1"}
                      borderRadius="$12"
                      alignItems="center"
                      backgroundColor="none"
                      size="$4"
                      icon={<Plus color="$color.text-secondary" />}
                      circular
                    ></Button>
                  </XStack>
                </YStack>
                {formError && <Text color="red">{formError}</Text>}
              </YStack>
              <Form.Trigger asChild>
                <Button
                  bordered={true}
                  borderColor="$color.btn-secondary"
                  bg="$color.btn-primary"
                  color="white"
                >
                  <Text fontSize="$8" fontWeight="bold" color="white">
                    Submit
                  </Text>
                </Button>
              </Form.Trigger>
            </Form>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
    </Dialog>
  );
};
