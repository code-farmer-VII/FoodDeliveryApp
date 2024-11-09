import React from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';

export default function Categories() {
  const items = [
    { id: "1", name: "Fastest Delivery" },
    { id: "2", name: "Rating 4.0+" },
    { id: "3", name: "Offers" },
    { id: "4", name: "Cuisines" },
    { id: "5", name: "MAX Safety" },
    { id: "6", name: "Pro" },
  ];

  return (
    <View className="flex justify-center items-center bg-slate-800 h-full">
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} className="m-5 p-5 bg-slate-600 rounded-md">
            <Text className="text-white font-semibold p-5">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}