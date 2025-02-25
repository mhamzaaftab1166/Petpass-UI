import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import style from "../../theme/style";
import { Colors } from "../../theme/color";
import petEdit from "../../../assets/images/pets/passport.png";
import { useTheme } from "../../helper/themeProvider";

const Passport = ({ pet, router }) => {
  const { isDarkMode } = useTheme();

  return (
    <View style={{ marginTop: 20,marginBottom:40 }}>
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
          {`${pet?.pet_name}'s Passport`}
        </Text>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/PetDetails/PetEditForms/DescriptionEdit",
              params: { pet: JSON.stringify(pet) },
            })
          }
        >
          <Image source={petEdit} style={{ width: 20, height: 20 }} />
        </Pressable>
      </View>
    </View>
  );
};

export default Passport;
