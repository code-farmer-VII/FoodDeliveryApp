import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';

const MenuItem = ({ item }) => {
  const [additems, setAddItems] = useState(0);
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  return (
    <View>
      <Pressable className="flex-row justify-between my-4 mx-4">
        <View>
          <Text className="text-lg font-bold w-56">{item?.name}</Text>
          <Text className="text-md font-medium mt-2">₹{item?.price}</Text>
          <View className="flex-row mt-4">
            {[0, 0, 0, 0, 0].map((en, i) => (
              <FontAwesome
                key={i}
                className="px-2"
                name={i < Math.floor(item.rating) ? "star" : "star-o"}
                size={15}
                color="#FFD700"
              />
            ))}
          </View>
          <Text className="text-gray-500 w-48 mt-4">{item?.description.length > 40 ? item?.description.substr(0, 37) + "..." : item?.description}</Text>
        </View>

        <Pressable className="mr-4">
          <Image
            className="w-28 h-28 rounded-md"
            source={{ uri: item?.image }}
          />
          {selected ? (
            <Pressable className="absolute top-24 left-5 bg-red-500 flex-row items-center px-4 py-2 rounded-md">
              <Pressable
                onPress={() => {
                  if (additems == 1) {
                    dispatch(removeFromCart(item));
                    setAddItems(0);
                    setSelected(false);
                    return;
                  }
                  setAddItems((c) => c - 1);
                  dispatch(decrementQuantity(item));
                }}
              >
                <Text className="text-white text-2xl px-2">-</Text>
              </Pressable>

              <Pressable>
                <Text className="text-white text-md px-2">{additems}</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setAddItems((c) => c + 1);
                  dispatch(incrementQuantity(item));
                }}
              >
                <Text className="text-white text-lg px-2">+</Text>
              </Pressable>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setSelected(true);
                if (additems == 0) {
                  setAddItems((c) => c + 1);
                }
                dispatch(addToCart(item));
              }}
              className="absolute top-24 left-5 border border-red-500 flex-row items-center px-6 py-2 bg-white rounded-md"
            >
              <Text className="text-red-500 text-lg font-bold">ADD</Text>
            </Pressable>
          )}
        </Pressable>
      </Pressable>
    </View>
  );
};

export default MenuItem;