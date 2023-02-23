import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Database from "./Database";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function ({ route, navigation }) {
  const id = route.params ? route.params.id : undefined;
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [tipo, setTipo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [image, setImage] = useState(null);

  // const imageUri = "file:///path/to/image.jpg";
  // const base64Image = FileSystem.readAsStringAsync(imageUri, {
  //   encoding: FileSystem.EncodingType.Base64,
  // });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    if (!route.params) return;
    setDescricao(route.params.descricao);
    setTipo(route.params.finalidade);
    setTipo(route.params.tipo);
    setQuantidade(route.params.quantidade.toString());
    setTipo(route.params.image);
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
      image,
    };
    Database.saveItem(listItem, id).then((response) =>
      navigation.navigate("Anúncios", listItem)
    );
  }

  function handleDeletePress() {
    Alert.alert(
        "Atenção",
        "Você tem certeza que deseja excluir este item?",
        [
            {
                text: "Não",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Sim", onPress: () => {
                    Database.deleteItem(props.id)
                        .then(response => props.navigation.navigate("Anúncios", { id: props.id }));
                }
            }
        ],
        { cancelable: false }
    );
}

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/imob.png")} />
      <View style={styles.inputContainer}>
        <ScrollView>
          <TextInput
            style={styles.input}
            onChangeText={handleDescriptionChange}
            placeholder="Qual o endereço?"
            clearButtonMode="always"
            value={descricao}
          />
          <TextInput
            style={styles.input}
            onChangeText={handleFinalityChange}
            placeholder="Qual a finalidade? Aluguel ou venda."
            clearButtonMode="always"
            value={finalidade}
          />
          <TextInput
            style={styles.input}
            onChangeText={handleTypeChange}
            placeholder="Qual o tipo? Casa, apartamente ou comércio."
            clearButtonMode="always"
            value={tipo}
          />
          <TextInput
            style={styles.input}
            onChangeText={handleQuantityChange}
            placeholder="Qual o valor?"
            keyboardType={"numeric"}
            clearButtonMode="always"
            value={quantidade.toString()}
          />
          <Button title="Selecione uma imagem" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, alignItems: "center", marginLeft: "20%", marginTop: "5%" }}
              value={image}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <View style={styles.buttonContainer}>
              <Icon name="save" size={22} color="white" />
              <Text style={styles.buttonText}>Salvar</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    height: "20%",
  },
});
