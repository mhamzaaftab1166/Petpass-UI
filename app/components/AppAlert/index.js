import React from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { StyleSheet } from "react-native";
import { useTheme } from "../../helper/themeProvider";
import { Colors } from "@/app/theme/color";

const AppAlert = ({
  showAlert,
  showProgress,
  title,
  message,
  closeOnTouchOutside,
  closeOnHardwareBackPress,
  showCancelButton,
  showConfirmButton,
  cancelText,
  confirmText,
  confirmButtonColor,
  onCancelPressed,
  onConfirmPressed,
}) => {
  const { isDarkMode } = useTheme();

  const styles = StyleSheet.create({
    alertContainer: {
      width: 500,
      borderRadius: 12,
      backgroundColor: isDarkMode ? Colors.active : Colors.secondary, 
      padding: 20,
    },
    title: {
      fontSize: 20,
      color: Colors.primary,
      textAlign: "center",
      fontFamily: "Avenir-Bold",
    },
    message: {
      fontSize: 16,
      color: isDarkMode ? Colors.secondary : Colors.lable,
      textAlign: "center",
      fontFamily: "Avenir-Regular",
      marginVertical: 10,
    },
    confirmButton: {
      width: 100,
      height: 40,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.primary, 
    },
    confirmButtonText: {
      fontSize: 16,
      color: Colors.secondary,
      fontFamily: "Avenir-SemiBold",
    },
    cancelButton: {
      width: 100,
      height: 40,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors.disable,
    },
    cancelButtonText: {
      fontSize: 16,
      color: Colors.secondary,
      fontFamily: "Avenir-SemiBold",
    },
  });

  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={showProgress}
      title={title}
      message={message}
      closeOnTouchOutside={closeOnTouchOutside}
      closeOnHardwareBackPress={closeOnHardwareBackPress}
      showCancelButton={showCancelButton}
      showConfirmButton={showConfirmButton}
      cancelText={cancelText}
      confirmText={confirmText}
      confirmButtonColor={confirmButtonColor}
      onCancelPressed={onCancelPressed}
      onConfirmPressed={onConfirmPressed}
      contentContainerStyle={styles.alertContainer}
      titleStyle={styles.title}
      messageStyle={styles.message}
      confirmButtonStyle={styles.confirmButton}
      confirmButtonTextStyle={styles.confirmButtonText}
      cancelButtonStyle={styles.cancelButton}
      cancelButtonTextStyle={styles.cancelButtonText}
    />
  );
};

export default AppAlert;
