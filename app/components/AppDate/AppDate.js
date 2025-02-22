import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../../theme/color";
import style from "../../theme/style";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../helper/themeProvider";
import { formatDate } from "../../utils/date";

const AppDatePicker = ({ value, onChange, placeholder, parentStyles }) => {
  
  const { isDarkMode } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || new Date());

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const openPicker = () => {
    Keyboard.dismiss();
    setShowPicker(true);
  };

  const handleDone = () => {
    onChange(selectedDate);
    setShowPicker(false);
  };

  return (
    <View
      style={[
        styles.container,
        style.txtinput,
        {
          backgroundColor: isDarkMode ? "transparent" : Colors.white,
          height: 40,
        },
        parentStyles,
      ]}
    >
      <TouchableOpacity
        onPress={openPicker}
        style={[
          style.r16,
          {
            color: isDarkMode ? Colors.secondary : Colors.active,
            flex: 1,
            flexDirection: "row",
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: value
                ? isDarkMode
                  ? Colors.secondary
                  : Colors.active
                : isDarkMode
                ? Colors.secondary
                : Colors.lable,
            },
          ]}
        >
          {value ? formatDate(value) : placeholder}
        </Text>
        <Icon
          name="calendar"
          size={20}
          color={isDarkMode ? Colors.secondary : Colors.disable}
        />
      </TouchableOpacity>

      {showPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            if (date) {
              onChange(date);
            }
            setShowPicker(false);
          }}
        />
      )}

      {showPicker && Platform.OS === "ios" && (
        <Modal
          transparent
          animationType="slide"
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
              />
              <TouchableOpacity onPress={handleDone}>
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default AppDatePicker;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  doneText: {
    marginTop: 10,
    fontSize: 18,
    color: Colors.primary,
  },
});
