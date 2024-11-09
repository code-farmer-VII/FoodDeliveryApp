import {
  Alert,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "../../components/Carousel";
import Categories from "../../components/Categories";
import Hotel from "../../components/Hotel";
import { supabase } from "../../supabase";
import { recommended, items, hotels } from "../../constant/constant";

const Index = () => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "fetching your location ..."
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Services not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServicesEnabled(true);
    }
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use the location service",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    let { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const address = await LocationGeocoding.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const streetAddress = address[0].name;
      for (let item of response) {
        let address = `${item.name}, ${item?.postalCode}, ${item?.city}`;

        setDisplayCurrentAddress(address);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from("hotels").select("*");
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Location Section */}
      <View className="flex-row items-center gap-3 p-3">
        <Octicons name="location" size={24} color="#E52850" />
        <View className="flex-1">
          <Text className="text-sm font-medium">Deliver To</Text>
          <Text className="text-gray-600 text-base mt-1">{displayCurrentAddress}</Text>
        </View>
        <Pressable className="bg-blue-400 w-10 h-10 rounded-full justify-center items-center">
          <Text className="text-white">S</Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center justify-between border border-gray-300 py-2 px-4 rounded-xl mt-2 mx-2">
        <TextInput placeholder="Search for food, hotels" className="flex-1" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>

      {/* Carousel and Categories */}
      <Carousel />
      <Categories />

      {/* Recommended Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommended?.map((item, index) => (
          <View
            key={index}
            className="bg-white flex-row mx-2 my-4 rounded-lg shadow-sm"
          >
            <Image
              className="w-24 h-24 rounded-tl-lg rounded-bl-lg object-cover"
              source={{ uri: item?.image }}
            />
            <View className="p-3 flex-1">
              <Text className="text-base font-medium">{item?.name}</Text>
              <Text className="text-gray-600 mt-1">{item?.type}</Text>
              <View className="flex-row items-center gap-1 mt-2">
                <Ionicons name="ios-time" size={24} color="green" />
                <Text>{item?.time} mins</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Explore Section */}
      <Text className="text-center mt-3 mb-1 text-gray-500 tracking-wider">
        EXPLORE
      </Text>

      {/* Items Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items?.map((item, index) => (
          <View
            key={index}
            className="w-24 border border-gray-300 py-2 px-3 rounded-md mx-2 my-2 items-center bg-white"
          >
            <Image className="w-12 h-12" source={{ uri: item?.image }} />
            <Text className="text-sm font-medium mt-2">{item?.name}</Text>
            <Text className="text-xs text-gray-500 mt-1">{item?.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* All Restaurants */}
      <Text className="text-center mt-3 mb-2 text-gray-500 tracking-wider">
        ALL RESTAURANTS
      </Text>

      {/* Hotels Section */}
      <View className="mx-2">
        {data?.map((item, index) => (
          <Hotel key={index} item={item} menu={item?.menu} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Index;
