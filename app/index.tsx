import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-end text-blue-600 text-5xl bg-gray-800">TrueScan</Text>
    </View>
  );
}
