import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../theme/color";
import { useTheme } from "../../helper/themeProvider";
import style from "../../theme/style";

const Title = ({ title, onClick, color = Colors.primary, size = "large", isLoad = false }) => {
  const { isDarkMode } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        paddingHorizontal: 20, 
        justifyContent: "space-between",
      }}
    >
      <Text style={[style.b18, { color: isDarkMode ? Colors.secondary : Colors.active }]}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("TopService")}>
        <Text style={[style.b12, { color: Colors.primary }]}>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Title;
