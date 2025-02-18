import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText/AppText";
import ItemPicker from "../ItemPicker/ItemPicker";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import SafeScreen from "../SafeScreen/SafeScreen";
import { useTheme } from "../../helper/themeProvider";

function AppPicker({
  icon,
  items = [],
  placeholder,
  numColumns = 1,
  width = "100%",
  PickerItemComponent = ItemPicker,
  selectedItem,
  onSelectedItem,
}) {
  const { isDarkMode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredItems = Array.isArray(items)
    ? items.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View
          style={[
            styles.container,
            { width: width, marginTop: 30 },
            style.txtinput,
          ]}
        >
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={Colors.primary}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <AppText
              style={[
                styles.text,
                style.r16,
                {
                  color: isDarkMode ? Colors.secondary : Colors.active,
                  flex: 1,
                },
              ]}
            >
              {selectedItem.label}
            </AppText> 
          ) : (
            <AppText
              style={[
                style.r16,
                styles.placeholder,
                { color: isDarkMode ? Colors.secondary : Colors.lable },
              ]}
            >
              {placeholder}
            </AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={Colors.primary}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={modalVisible}
        animationType="slide"
        style={{
          backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
          fontFamily: "Avenir-Regular",
        }}
      >
        <SafeScreen
          style={{
            backgroundColor: isDarkMode ? Colors.active : Colors.secondary,
            flex: 1,
          }}
        >
          <Button
            color={isDarkMode ? Colors.secondary : Colors.active}
            title="Close"
            onPress={() => setModalVisible(false)}
          />
          {/* Search Input Field */}
          <TextInput
            style={[
              style.r16,
              {
                color: isDarkMode ? Colors.secondary : Colors.active,
                fontFamily: "Avenir-Regular",
              },
              styles.searchInput,
              style.txtinput,
            ]}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            placeholderTextColor={isDarkMode ? Colors.secondary : Colors.lable}
          />
          <FlatList
            data={[{ label: "Search", value: "" }, ...filteredItems]}
            style={{ fontFamily: "Avenir-Regular" }}
            keyExtractor={(item, index) =>
              item.value + (item.label || "") + index
            }
            numColumns={numColumns}
            renderItem={({ item }) =>
              item.label === "Search" ? null : (
                <PickerItemComponent
                  item={item}
                  onPress={() => {
                    setModalVisible(false);
                    onSelectedItem(item);
                  }}
                />
              )
            }
          />
        </SafeScreen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontFamily: "Avenir-Regular",
  },
  placeholder: {
    flex: 1,
    color: Colors.disable1,
  },
  searchInput: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default AppPicker;
