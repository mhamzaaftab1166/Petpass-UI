import AwesomeAlert from "react-native-awesome-alerts";

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
    />
  );
};


export default AppAlert