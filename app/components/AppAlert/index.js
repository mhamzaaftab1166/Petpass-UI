import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useTheme } from "../../helper/themeProvider";
import { Colors } from "@/app/theme/color";

const AppAlert = ({
  showAlert = false,
  showProgress = false,
  title = "",
  message = "",
  closeOnTouchOutside = true,
  closeOnHardwareBackPress = true,
  showCancelButton = false,
  showConfirmButton = true,
  cancelText = "Cancel",
  confirmText = "OK",
  confirmButtonColor = Colors.primary,
  onCancelPressed = () => {},
  onConfirmPressed = () => {},
}) => {
  const { isDarkMode } = useTheme();
  const singleButton =
    (showCancelButton && !showConfirmButton) ||
    (!showCancelButton && showConfirmButton);

  return (
    <Modal
      visible={!!showAlert}
      transparent
      animationType="fade"
      hardwareAccelerated
      statusBarTranslucent={Platform.OS === "android"}
      onRequestClose={() => {
        if (closeOnHardwareBackPress) {
          onCancelPressed && onCancelPressed();
        }
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (closeOnTouchOutside) {
            onCancelPressed && onCancelPressed();
          }
        }}
      >
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.centered}>
        <View
          style={[
            styles.alertContainer,
            { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
          ]}
        >
          {title ? (
            <Text style={[styles.title, { color: Colors.primary }]}>
              {title}
            </Text>
          ) : null}

          {showProgress ? (
            <View style={styles.progressRow}>
              <ActivityIndicator
                size="small"
                color={confirmButtonColor || Colors.primary}
              />
              <Text style={[styles.message, { marginLeft: 10 }]}>
                {message || "Please wait..."}
              </Text>
            </View>
          ) : message ? (
            <Text
              style={[
                styles.message,
                { color: isDarkMode ? Colors.secondary : Colors.lable },
              ]}
            >
              {message}
            </Text>
          ) : null}

          <View
            style={[
              styles.buttonsRow,
              singleButton && { justifyContent: "center" },
            ]}
          >
            {showCancelButton ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.cancelButton,
                  {
                    backgroundColor: Colors.disable,
                    flex: singleButton ? 1 : 0.48,
                  },
                ]}
                onPress={() => onCancelPressed && onCancelPressed()}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            ) : null}

            {showConfirmButton ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.confirmButton,
                  {
                    backgroundColor: confirmButtonColor || Colors.primary,
                    flex: singleButton ? 1 : 0.48,
                  },
                ]}
                onPress={() => onConfirmPressed && onConfirmPressed()}
              >
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "#00000066",
  },
  centered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  alertContainer: {
    width: "100%",
    maxWidth: 500,
    borderRadius: 12,
    padding: 20,
    zIndex: 1000,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Avenir-Bold",
    marginBottom: 6,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Avenir-Regular",
    marginVertical: 8,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  buttonsRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  confirmButton: {
    height: 42,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  confirmButtonText: {
    fontSize: 16,
    color: Colors.secondary,
    fontFamily: "Avenir-SemiBold",
  },
  cancelButton: {
    height: 42,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  cancelButtonText: {
    fontSize: 16,
    color: Colors.secondary,
    fontFamily: "Avenir-SemiBold",
  },
});

export default AppAlert;
