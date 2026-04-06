import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    BaseFont: require('../assets/fonts/OpenSans-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  );
}
