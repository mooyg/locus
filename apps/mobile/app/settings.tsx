import { Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export default function SettingsPage() {
  return (
    <View className="flex-1 bg-baby-blue-600">
      <View className="flex border-b border-black p-2">
        <Pressable className="flex flex-row gap-2 items-center">
          <AntDesign name="left" size={16} color="black" />
          <Text className="font-bold text-black text-xl">Settings</Text>
        </Pressable>
        <View></View>
      </View>
    </View>
  );
}
