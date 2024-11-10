import { 
  Text,
  View,
  ScrollView,
  Pressable,
  Animated,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FoodItem from "../../components/FoodItem";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import { menu } from "../../constant/constant";

const Hotel = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  const scrollViewRef = useRef(null);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const ITEM_HEIGHT = 650;
  
  // Scroll to a specific category
  const scrollToCategory = (index) => {
    const yOffset = index * ITEM_HEIGHT;
    Animated.timing(scrollAnim, {
      toValue: yOffset,
      duration: 500,
      useNativeDriver: true,
    }).start();
    scrollViewRef.current.scrollTo({ y: yOffset, animated: true });
  };

  const [modalVisible, setModalVisible] = useState(false);

  // Safely parse the menu
  let recievedMenu = [];
  try {
    recievedMenu = params?.menu ? JSON.parse(params?.menu) : [];
  } catch (e) {
    console.error("Failed to parse menu:", e);
  }

  return (
    <>
      <ScrollView ref={scrollViewRef} className="bg-white">
        {/* Header Section */}
        <View className="mt-5 flex-row items-center justify-between">
          <Ionicons
            onPress={() => router.back()}
            className="p-2"
            name="arrow-back"
            size={24}
            color="black"
          />
          <View className="flex-row items-center px-4 gap-2">
            <SimpleLineIcons name="camera" size={24} color="black" />
            <Ionicons name="bookmark-outline" size={24} color="black" />
            <MaterialCommunityIcons name="share-outline" size={24} color="black" />
          </View>
        </View>

        {/* Restaurant Info Section */}
        <View className="justify-center items-center my-3">
          <Text className="text-xl font-bold">{params?.name}</Text>
          <Text className="mt-1 text-gray-600 font-medium text-base">
            North Indian • Fast Food • 160 for one
          </Text>
          <View className="flex-row items-center gap-1 mt-2">
            <View className="flex-row items-center bg-[#006A4E] rounded p-1 gap-1">
              <Text className="text-white text-sm font-bold">{params?.aggregate_rating}</Text>
              <Ionicons name="star" size={15} color="white" />
            </View>
            <Text className="text-base font-medium ml-2">3.2K Ratings</Text>
          </View>
          <View className="justify-center items-center bg-[#D0F0C0] rounded-full px-4 py-1 mt-3">
            <Text>30 - 40 mins • 6 km | Bangalore</Text>
          </View>
        </View>

        {/* Food Items Section */}
        {recievedMenu?.map((item, index) => (
          item && item.name ? <FoodItem key={index} item={item} /> : null
        ))}
      </ScrollView>

      {/* Category Navigation */}
      <View className="flex-row bg-white">
        {recievedMenu?.map((item, index) => (
          <Pressable
            onPress={() => scrollToCategory(index)}
            className="px-3 py-2 rounded-md my-2 mx-2 items-center justify-center border border-[#181818]"
          >
            <Text>{item?.name}</Text>
          </Pressable>
        ))}
      </View>

      {/* Menu Button */}
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        className="w-15 h-15 rounded-full justify-center items-center absolute right-6 bottom-16 bg-black"
      >
        <Ionicons className="text-center" name="md-fast-food-outline" size={24} color="white" />
        <Text className="text-center text-white font-medium text-xs mt-1">
          MENU
        </Text>
      </Pressable>

      {/* Menu Modal */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
      >
        <View className="h-48 w-62 bg-black absolute bottom-9 right-2 rounded-lg">
          {menu?.map((item, index) => (
            <View key={index} className="p-3 flex-row items-center justify-between">
              <Text className="text-[#D0D0D0] font-semibold text-lg">
                {item?.name}
              </Text>
              <Text className="text-[#D0D0D0] font-semibold text-lg">
                {item?.items?.length}
              </Text>
            </View>
          ))}
          <View className="justify-center items-center">
            <Image
              className="w-30 h-16 object-contain"
              source={{
                uri: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza",
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Cart Button */}
      {cart?.length > 0 && (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/cart",
              params: {
                name: params.name,
              },
            })
          }
          className="bg-[#fd5c63] px-4 py-2 justify-center items-center"
        >
          <Text className="text-center text-white text-lg font-semibold">
            {cart.length} items added
          </Text>
          <Text className="text-center text-white mt-1 font-semibold">
            Add items(s) worth 240 to reduce surge fee by Rs 35.
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default Hotel;
