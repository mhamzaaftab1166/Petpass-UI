import { Dimensions, SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import style from "../theme/style";
import { Colors } from "../theme/color";
import Banner from "../components/PetDetailsComponents/Banner";
import Description from "../components/PetDetailsComponents/Description";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default function PetDetailPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={[style.area, { backgroundColor: Colors.secondary }]}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Banner router={router} />
      <View
        style={[
          style.main,
          { backgroundColor: Colors.secondary, marginTop: 10 },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Description
            router={router}
            title="Description"
            text={
              "Lorem ipsum dolor sit amet, consectetur pisicing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua."
            }
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
