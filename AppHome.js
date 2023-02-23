import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Database from "./Database";

export default function ({ route, navigation }) {
  const id = route.params ? route.params.id : undefined;
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [tipo, setTipo] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    if (!route.params) return;
    setDescricao(route.params.descricao);
    setTipo(route.params.finalidade);
    setTipo(route.params.tipo);
    setQuantidade(route.params.quantidade.toString());
  }, [route]);

  function handleDescriptionChange(descricao) {
    setDescricao(descricao);
  }

  function handleFinalityChange(finalidade) {
    setFinalidade(finalidade);
  }

  function handleTypeChange(tipo) {
    setTipo(tipo);
  }

  function handleQuantityChange(quantidade) {
    setQuantidade(quantidade);
  }

  async function handleButtonPress() {
    const listItem = {
      descricao,
      finalidade,
      tipo,
      quantidade: parseInt(quantidade),
    };
    Database.saveItem(listItem, id).then((response) =>
      navigation.navigate("Anúncios", listItem)
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.imageLogo} source={require("./assets/imob.png")} />
      <View style={styles.inputContainer}>
        <Text style={styles.text}> What is is Lorem loren Ipsum Ipsum?</Text>
        <Text style={styles.textSub}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>
        <Image style={styles.image} source={require("./assets/avenda.png")} />
        <Text style={styles.text}> What is is Lorem loren Ipsum Ipsum?</Text>
        <Text style={styles.textSub}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#48d1cc",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: "90%",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "stretch",
    backgroundColor: "#fff",
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "stretch",
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: "blue",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    alignItems: "center",
    width: "100%",
    height: "45%",
  },
  text: {
    marginTop: 10,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: "center",
    fontWeight: "bold",
  },
  textSub: {
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 12,
    textAlign: "left",
  },
  imageLogo: {
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
});
