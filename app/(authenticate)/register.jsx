import React, { useState } from "react";
import { SafeAreaView, Text, View, KeyboardAvoidingView, TextInput, Pressable, Alert } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../../supabase";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      name: name,
      email: email,
      password: password,
    });

    if (data?.user?.role === "authenticated") {
      Alert.alert("You have been successfully registered", "Please check your email for confirmation.");
    }
    if (error) {
      Alert.alert("Error while registering", "Please try again.");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View className="mt-12">
        <Text className="text-xl font-bold text-center">Food App</Text>
      </View>

      <KeyboardAvoidingView>
        <View className="items-center">
          <Text className="text-lg font-bold mt-3 text-red-600">Register to your account</Text>
        </View>

        <View className="mt-16">
          {/* Name Input */}
          <View className="flex-row items-center gap-2 bg-gray-200 py-2 px-3 rounded-md mt-7">
            <Ionicons className="ml-2" name="person" size={24} color="gray" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              className="text-gray-600 my-2 w-72"
              placeholder="Enter your Name"
            />
          </View>

          {/* Email Input */}
          <View className="flex-row items-center gap-2 bg-gray-200 py-2 px-3 rounded-md mt-7">
            <MaterialIcons className="ml-2" name="email" size={24} color="gray" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="text-gray-600 my-2 w-72"
              placeholder="Enter your Email"
            />
          </View>

          {/* Password Input */}
          <View className="flex-row items-center gap-2 bg-gray-200 py-2 px-3 rounded-md mt-7">
            <AntDesign className="ml-2" name="lock1" size={24} color="black" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              className="text-gray-600 my-2 w-72"
              placeholder="Enter your Password"
            />
          </View>
        </View>

        {/* Register Button */}
        <Pressable
          onPress={signUpNewUser}
          className="w-48 bg-red-500 rounded-lg mx-auto py-4 mt-12"
        >
          <Text className="text-center font-bold text-lg text-white">Register</Text>
        </Pressable>

        {/* Login Link */}
        <Pressable onPress={() => router.replace("/login")} className="mt-4">
          <Text className="text-center text-gray-500 text-lg">Already have an Account? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;
