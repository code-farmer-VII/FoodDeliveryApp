import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MenuItem from './MenuItem';

const FoodItem = ({ item }) => {
  const data = [item];
  return (
    <View className="flex-1">
      {data?.map((item, index) => (
        <>
          <Pressable className="flex-row items-center justify-between p-4" key={index}>
            <Text className="text-lg font-bold">{item?.name} ({item?.items?.length})</Text>
            <AntDesign name="down" size={20} color="black" />
          </Pressable>

          {item?.items?.map((item, index) => (
            <MenuItem key={index} item={item} className="mt-2" />
          ))}
        </>
      ))}
    </View>
  );
};

export default FoodItem;