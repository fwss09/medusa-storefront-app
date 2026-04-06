import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{headerTitleAlign: 'center'}} />
      <Text>Кошик</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}
})