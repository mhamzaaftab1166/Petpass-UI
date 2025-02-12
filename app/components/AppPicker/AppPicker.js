import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText/AppText";
import ItemPicker from "../ItemPicker/ItemPicker"
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import SafeScreen from "../SafeScreen/SafeScreen";
import { useTheme } from "../../helper/themeProvider";

function AppPicker({
  icon,
  items,
  placeholder,
  numColumns = 1,
  width = "100%",
  PickerItemComponent = ItemPicker,
  selectedItem,
  onSelectedItem,
}) {
  const { isDarkMode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
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
                { color: isDarkMode ? Colors.secondary : Colors.active, flex: 1 },
              ]}
            >
              {selectedItem.label}
            </AppText>
          ) : (
            <AppText style={[styles.placeholder, { color: Colors.lable }]}>
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
      <Modal visible={modalVisible} animationType="slide" style={{backgroundColor: isDarkMode ? Colors.active : Colors.secondary}}>
        <SafeScreen>
          <Button
            color={isDarkMode ? Colors.active : Colors.secondary}
            title="Close"
            onPress={() => setModalVisible(false)}
          ></Button>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectedItem(item);
                }}
              />
            )}
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
  },
  placeholder: {
    flex: 1,
    color: Colors.disable1,
  },
});
export default AppPicker;
