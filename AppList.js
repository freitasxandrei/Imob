import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import AppItem from "./AppItem";
import Database from "./Database";
import * as FileSystem from "expo-file-system";

export default function AppList({ route, navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    Database.getItems().then((items) => setItems(items));
  }, [route]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.image} source={require("./assets/imob.png")} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.itemsContainer}
      >
        {items.map((item) => {
          return (
            <>
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100 }}
              />
              <AppItem
                key={item.id}
                id={item.id}
                item={
                  " Endereço: " +
                  item.descricao +
                  " | " +
                  " Finalidade: " +
                  item.finalidade +
                  " | " +
                  " Tipo: " +
                  item.tipo +
                  " | " +
                  " Quantidade: " +
                  " R$" +
                  item.quantidade
                }
                navigation={navigation}
              />
            </>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#48d1cc",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    width: "90%",
  },
  itemsContainer: {
    flex: 1,
    marginTop: 10,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  image: {
    alignItems: "center",
    width: "100%",
    height: "20%",
    marginBottom: "5%",
  },
});
