import React from "react";
import { ImageBackground, Text, View, Dimensions } from "react-native";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import Title from "../Title/Title";
import { useTheme } from "../../helper/themeProvider";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const PetTips = ({ tips = [], loading }) => {
  const { width, height } = Dimensions.get("screen");
  const { isDarkMode } = useTheme();

  if (loading)
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text
          style={[
            style.b14,
            { color: isDarkMode ? Colors.secondary : Colors.active },
          ]}
        >
          Loading Tips...
        </Text>
      </View>
    );

  if (tips.length < 1) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text
          style={[
            style.b14,
            { color: isDarkMode ? Colors.secondary : Colors.active },
          ]}
        >
          No Pet Tips Available
        </Text>
      </View>
    );
  }

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  
  const handleViewAllClick = () => {
    router.push("/GeneralScreens/Tips/PetTipListing");
  };

  return (
    <>
      <Title title="Pet Tips" onClick={handleViewAllClick} />
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        {tips
          .reduce((rows, tip, index) => {
            if (index % 2 === 0) rows.push([tip]);
            else rows[rows.length - 1].push(tip);
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              {row.map((tip, colIndex) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      `/GeneralScreens/Tips/TipDetailPage?id=${tip?.id}`
                    )
                  }
                  key={colIndex}
                  style={{ width: width / 2.3 }}
                >
                  <ImageBackground
                    source={{ uri: tip.image }}
                    resizeMode="cover"
                    style={{ height: height / 5.8, borderRadius: 10, overflow: 'hidden' }}
                  />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={[
                      style.b14,
                      {
                        color: isDarkMode ? Colors.secondary : Colors.active,
                        marginTop: 10,
                        paddingLeft: 2,
                      },
                    ]}
                  >
                    {truncateText(tip.title, 25)}{" "}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[
                      style.r14,
                      {
                        color: isDarkMode ? Colors.secondary : Colors.disable,
                        gap: 3,
                      },
                    ]}
                  >
                    {truncateText(tip.overview, 60)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
      </View>
    </>
  );
};

export default PetTips;
