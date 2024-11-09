import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, KeyboardAvoidingView, TextInput, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../../supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await AsyncStorage.removeItem("authToken");
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          router.replace("/(home)/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkLogin();
  }, []);

  async function signUpWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (data) {
      const token = data?.session?.access_token;
      AsyncStorage.setItem("authToken", token);
      router.replace("/(home)/");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View className="mt-12">
        <Text className="text-xl font-bold text-center">Food App</Text>
      </View>

      <KeyboardAvoidingView>
        <View className="items-center">
          <Text className="text-lg font-bold mt-3 text-red-600">
            Log in to your account
          </Text>
        </View>

        <View className="mt-16">
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

        <View className="flex-row items-center justify-between mt-3">
          <Text>Keep me Logged In</Text>
          <Text>Forgot Password</Text>
        </View>

        {/* Login Button */}
        <Pressable
          onPress={signUpWithEmail}
          className="w-48 bg-red-500 rounded-lg mx-auto py-4 mt-12"
        >
          <Text className="text-center font-bold text-lg text-white">Login</Text>
        </Pressable>

        {/* Signup Link */}
        <Pressable onPress={() => router.replace("/register")} className="mt-4">
          <Text className="text-center text-gray-500 text-lg">
            Don't have an Account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;
