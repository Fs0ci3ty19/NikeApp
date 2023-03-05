import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Text,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import products from "../data/products";
import { cartSlice } from "../store/cartSlice";

const ProductDetailsScreen = ({ navigation }) => {
  const sChanged = ({ viewableItems }) => {
    const i = viewableItems[0].index;
    setSelectedIdx(i);
    // console.log("IDXX", i);
  };

  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged: sChanged },
  ]);

  const product = useSelector((state) => state.products.selectedProduct);
  const dispatch = useDispatch();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { width } = useWindowDimensions();

  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));
    navigation.navigate("Cart");
  };

  return (
    <View style={{ backgroundColor: "#F5F5F5" }}>
      <ScrollView>
        <FlatList
          data={product.images}
          renderItem={({ item, index }) => {
            return (
              <Image
                key={index}
                source={{ uri: item }}
                style={{ width: width, aspectRatio: 1 }}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          viewabilityConfig={{
            waitForInteraction: true,
            itemVisiblePercentThreshold: 100,
          }}
        />

        <View
          style={{
            padding: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: "#E0E0E0",
          }}
        >
          <FlatList
            contentContainerStyle={{
              // borderBottomLeftRadius: 20,
              // backgroundColor: "pink",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            data={product.images}
            renderItem={({ index }) => {
              // console.log("selectedIDX: ", selectedIdx, " cc: ", index);
              return (
                <View
                  style={{
                    backgroundColor:
                      index === selectedIdx ? "black" : "#E0E0E0",
                    height: 4.5,
                    width: 30,
                    borderRadius: 4.5,
                    marginHorizontal: 2,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                ></View>
              );
            }}
            scrollEnabled={false}
            horizontal
          />
          {/* Title */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${product.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
      {/* Add to cart button */}
      <Pressable onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>

      {/* Navigation icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  button: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 20,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
