import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import petEdit from "../../../assets/images/pets/petEdit.png";

const Description = ({ title = "Description", text, router }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={[style.s16, { color: Colors.active }]}>{title}</Text>
        <Pressable
          onPress={() =>
            router.push("/PetDetails/PetEditForms/DescriptionEdit")
          }
        >
          <Image source={petEdit} style={{ width: 20, height: 20 }} />
        </Pressable>
      </View>
      <Text style={[style.r16, { color: Colors.disable, marginTop: 5 }]}>
        {text}
      </Text>
      <View style={[style.divider, { marginVertical: 10 }]}></View>
    </View>
  );
};

export default Description;
