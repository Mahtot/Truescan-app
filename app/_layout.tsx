import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import './globals.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />

      <Stack>
        <Stack.Screen name="index" options={{
          headerShown: false
        }} />
        <Stack.Screen name="scan" options={{ headerShown: false }} />

      </Stack>
    </>)
}
