import React from 'react';
import { Pressable, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Hotel = ({ item, menu }) => {
  const router = useRouter();
  const menuItems = JSON.stringify(menu);
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/hotel',
          params: {
            id: item.id,
            name: item.name,
            adress: item.adress,
            smalladress: item.smalladress,
            cuisines: item.cuisines,
            aggregate_rating: item.aggregate_rating,
            menu: menuItems,
          },
        })
      }
      className="bg-white rounded-2xl m-4 p-4"
    >
      <Image
        className="w-full aspect-[6/4] rounded-t-2xl"
        source={{ uri: item?.featured_image }}
      />
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-lg font-bold px-4 mt-4">{item?.name}</Text>
          <Text className="text-md font-medium px-4 mt-2 text-gray-500">{item?.description}</Text>
          <Text className="text-sm font-medium px-4 mt-2 text-gray-600">{item?.time}</Text>
        </View>

        <View className="flex-row items-center bg-green-500 rounded-md px-2 py-1 mr-4 gap-2">
          <Text className="text-white text-center">{item?.aggregate_rating}</Text>
          <Ionicons name="ios-star" size={15} color="white" />
        </View>
      </View>
      <View className="border-b border-gray-300 mx-4 my-2" />
      <View className="flex-row items-center gap-4 mx-4 my-2">
        <MaterialCommunityIcons name="brightness-percent" size={24} color="#1F75FE" />
        <Text className="ml-2 text-blue-500 font-medium">20% OFF up to Rs 100</Text>
      </View>
    </Pressable>
  );
};

export default Hotel;