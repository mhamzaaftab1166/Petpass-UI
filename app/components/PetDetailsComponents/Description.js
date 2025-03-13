import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import petEdit from "../../../assets/images/pets/petEdit.png";
import { useTheme } from "../../helper/themeProvider";

const Description = ({ title = "Description", pet, router, isEdit }) => {
  const { isDarkMode } = useTheme();

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            style.s16,
            {
              color: isDarkMode ? Colors.secondary : Colors.active,
              fontFamily: "Avenir-Bold",
            },
          ]}
        >
          {title}
        </Text>
        <Pressable
          onPress={() =>
            router.replace({
              pathname: "/PetDetails/PetEditForms/DescriptionEdit",
              params: { pet: JSON.stringify(pet) },
            })
          }
        >
         {isEdit && <Image source={petEdit} style={{ width: 20, height: 20 }} />}
        </Pressable>
      </View>
      <Text
        style={[
          style.r16,
          {
            color: isDarkMode ? Colors.secondary : Colors.disable,
            marginTop: 10,
            fontFamily: "Avenir-Regular",
          },
        ]}
      >
        {pet?.description || "No Decription Added."}
      </Text>
      <View style={[style.divider, { marginTop: 20 }]}></View>
    </View>
  );
};

export default Description;
