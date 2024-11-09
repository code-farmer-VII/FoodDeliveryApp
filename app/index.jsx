import { router } from 'expo-router'
import React from 'react'
import { View, Text, Button } from 'react-native'

function index() {

    const handlePress = () => {
        // Navigate to login screen
        router.push("/(authenticate)/login")
    }

  return (
    <View className="flex flex-1 items-center justify-center" >
        <Text>Welcome to the Food Delivery App!</Text>
      <Text>Please login or register to access your account.</Text>
      <Button title="Login" onPress={handlePress}/>
    </View>
  )
}

export default index