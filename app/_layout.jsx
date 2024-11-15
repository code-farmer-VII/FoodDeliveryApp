import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="(authenticate)" options={{headerShown: false}} />
      <Stack.Screen name="(home)" options={{headerShown: false}} />
    </Stack>
  );
}
