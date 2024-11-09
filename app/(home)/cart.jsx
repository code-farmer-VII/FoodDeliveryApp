import React from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { Ionicons, FontAwesome5, Feather, AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart, decrementQuantity, incrementQuantity } from "../../redux/CartReducer";

const cart = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const instructions = [
    { id: "0", name: "Avoid Ringing", iconName: "bell" },
    { id: "1", name: "Leave at the door", iconName: "door-open" },
    { id: "2", name: "directions to reach", iconName: "directions" },
    { id: "3", name: "Avoid Calling", iconName: "phone-alt" },
  ];

  const total = cart
    ?.map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  return (
    <>
      <ScrollView className="p-4 flex-1 bg-blue-50">
        <View className="flex-row items-center gap-2">
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text>{params?.name}</Text>
        </View>

        <View className="bg-white p-2 mt-4 rounded-lg">
          <Text>
            Delivery in <Text className="font-medium">35 - 40 mins</Text>
          </Text>
        </View>

        <View className="my-6">
          <Text className="text-center tracking-wider text-sm text-gray-600">ITEM(S) ADDED</Text>
        </View>

        <View>
          {cart?.map((item, index) => (
            <Pressable className="bg-white p-2" key={index}>
              <View className="flex-row items-center justify-between my-2">
                <Text className="w-48 text-base font-semibold">{item?.name}</Text>
                <Pressable className="flex-row px-2 py-1 items-center border border-gray-300 rounded-md">
                  <Pressable onPress={() => dispatch(decrementQuantity(item))}>
                    <Text className="text-lg text-green-600 px-2 font-semibold">-</Text>
                  </Pressable>

                  <Pressable>
                    <Text className="text-lg text-green-600 px-3 font-semibold">{item.quantity}</Text>
                  </Pressable>

                  <Pressable onPress={() => dispatch(incrementQuantity(item))}>
                    <Text className="text-lg text-green-600 px-2 font-semibold">+</Text>
                  </Pressable>
                </Pressable>
              </View>

              <View className="flex-row items-center justify-between">
                <Text className="text-base font-bold">₹{item.price * item.quantity}</Text>
                <Text className="text-sm font-medium">Quantity : {item?.quantity}</Text>
              </View>
            </Pressable>
          ))}

          <View className="my-4">
            <Text className="text-lg font-semibold">Delivery Instructions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {instructions?.map((item, index) => (
                <Pressable key={index} className="m-2 p-2 bg-white rounded-lg">
                  <View className="flex-col items-center">
                    <FontAwesome5 name={item?.iconName} size={22} color="gray" />
                    <Text className="w-20 text-xs text-center pt-2 text-gray-800">{item?.name}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Add more items / instructions / don't send cutlery */}
          {[
            { icon: <Feather name="plus-circle" size={24} color="black" />, text: "Add more Items" },
            { icon: <Entypo name="new-message" size={24} color="black" />, text: "Add more cooking instructions" },
            { icon: <MaterialCommunityIcons name="food-fork-drink" size={24} color="black" />, text: "Don't send cutlery with this order" },
          ].map((option, index) => (
            <View key={index} className="flex-row items-center justify-between bg-white py-2 px-2">
              <View className="flex-row items-center gap-2">
                {option.icon}
                <Text>{option.text}</Text>
              </View>
              <AntDesign name="right" size={20} color="black" />
            </View>
          ))}

          <View className="bg-white p-2 my-4">
            <View className="flex-row items-center justify-between">
              <Text>Feeding India Donation</Text>
              <AntDesign name="checksquare" size={24} color="#fd5c63" />
            </View>
            <View className="flex-row items-center justify-between mt-2">
              <Text className="text-gray-500">Working towards a malnutrition-free India</Text>
              <Text>₹3</Text>
            </View>
          </View>

          {/* Billing Details */}
          <View className="my-6">
            <Text className="text-lg font-bold">Billing Details</Text>
            <View className="bg-white rounded-lg p-2 mt-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-gray-600">Item Total</Text>
                <Text className="text-sm text-gray-600">₹{total}</Text>
              </View>
              <View className="flex-row items-center justify-between my-2">
                <Text className="text-sm text-gray-600">Delivery Fee</Text>
                <Text className="text-sm text-gray-600">₹15.00</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm text-gray-600">Delivery Partner Fee</Text>
                <Text className="text-sm text-gray-600">₹75</Text>
              </View>

              <View className="my-4">
                <View className="flex-row items-center justify-between my-2">
                  <Text className="font-bold text-sm">To pay</Text>
                  <Text>₹{total + 90}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Payment Section */}
      {total !== 0 && (
        <Pressable className="flex-row items-center justify-between p-5 bg-white">
          <View>
            <Text className="text-lg font-semibold">Pay Using Cash</Text>
            <Text className="mt-2 text-sm">Cash on Delivery</Text>
          </View>

          <Pressable
            onPress={() => {
              dispatch(cleanCart());
              router.replace({
                pathname: "/order",
                params: { name: params?.name },
              });
            }}
            className="bg-red-500 p-3 w-48 rounded-md flex-row items-center justify-between gap-3"
          >
            <View>
              <Text className="text-white text-lg font-bold">{total + 95}</Text>
              <Text className="text-white text-sm font-medium mt-1">TOTAL</Text>
            </View>
            <Text className="text-white text-lg font-medium">Place Order</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default cart;
