import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const Order = () => {
  const params = useLocalSearchParams();
  const [tip, setTip] = useState(0);
  const time = moment().format("LT");
  const mapView = useRef(null);
  const [coordinates] = useState([
    {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      latitude: 13.0451,
      longitude: 77.6269,
    },
  ]);
  
  useEffect(() => {
    mapView.current.fitToCoordinates(coordinates, {
      edgePadding: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
    });
  }, []);

  return (
    <SafeAreaView>
      {/* Header Section */}
      <View className="flex-row items-center justify-between h-16 bg-red-500 p-4">
        <View>
          <Text className="text-white text-base font-semibold">Delivery in 25 mins</Text>
          <Text className="text-white text-base font-semibold">Order placed at {time}</Text>
        </View>
        <Text className="text-white text-base font-semibold">HELP</Text>
      </View>

      {/* Map Section */}
      <MapView
        ref={mapView}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        className="w-full h-96"
      >
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
        <Polyline
          coordinates={coordinates}
          strokeColor="black"
          lineDashPattern={[4]}
          strokeWidth={1}
        />
      </MapView>

      {/* Bottom Section with Tip Options */}
      <View className="h-80 w-full bg-white rounded-t-xl">
        <View className="p-4">
          <Text className="text-lg font-medium text-center">{params?.name} has accepted your order</Text>
          <View className="flex-row mt-6">
            <FontAwesome5 name="hand-holding-heart" size={28} color="#fc8019" />
            <View className="ml-4">
              <Text className="text-xl font-medium">Tip your hunger Saviour</Text>
              <Text className="text-base font-semibold text-gray-600 mt-2">
                Thank your delivery partner for helping you stay safe indoors. Support them through these tough times with a tip.
              </Text>
              
              {/* Tip Buttons */}
              <Pressable className="flex-row mt-6">
                {['30', '50', '70'].map((amount, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.6}
                    onPress={() => setTip(parseInt(amount))}
                    className={`bg-gray-100 mx-2 p-2 rounded-md ${tip === parseInt(amount) ? 'bg-orange-500' : ''}`}
                  >
                    <Text className="text-blue-900 font-bold">{`₹${amount}`}</Text>
                    {tip === parseInt(amount) && (
                      <Text className="bg-orange-500 text-white text-xs font-bold p-1 mt-1">
                        Most Tipped
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </Pressable>
            </View>
          </View>

          {/* Display Tip Confirmation */}
          {tip ? (
            <View className="mt-4">
              <Text className="text-orange-600 font-semibold text-lg p-4">
                Please pay ₹{tip} to your delivery agent at the time of delivery.
              </Text>
              <TouchableOpacity
                onPress={() => setTip(0)}
                activeOpacity={0.7}
                className="absolute top-10 left-4 p-2"
              >
                <Text className="text-red-600 font-bold text-sm">(Cancel)</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Order;
