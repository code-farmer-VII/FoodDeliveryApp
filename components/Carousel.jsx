import React from "react";
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const Carousel = () => {
  const images = [
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ height: 200 }}>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          autoplayLoopKeepAnimation
          index={0}
          showPagination
          paginationStyleItem={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 3,
            backgroundColor: 'gray',
          }}
        >
          {images.map((image, index) => {
            return (
              <View key={index} style={styles.child}>
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            );
          })}
        </SwiperFlatList>
      </View>
    </SafeAreaView>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  child: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#3498db', // You can adjust this if you want a different color for the background.
    width: '100%', // Ensure the child container takes full width
    height: '100%', // Ensure the child container takes full height of its parent
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
