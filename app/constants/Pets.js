import { StyleSheet } from "react-native";
import { Colors } from "../theme/color";

export const customPetStyles = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 40,
  separatorStrokeFinishedWidth: 3,
  separatorStrokeUnfinishedWidth: 3,
  stepStrokeCurrentColor: "white",
  stepStrokeFinishedColor: Colors.primary,
  stepStrokeUnFinishedColor: Colors.unSelect,
  separatorFinishedColor: Colors.primary,
  separatorUnFinishedColor: Colors.unSelect,
  stepIndicatorFinishedColor: "white",
  stepIndicatorUnFinishedColor: "white",
  stepIndicatorCurrentColor: "white",
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: Colors.primary,
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: Colors.unSelect,
  labelColor: "transparent",
  currentStepLabelColor: "transparent",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "18%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
  },
  previousButton: {
    backgroundColor: Colors.unSelect,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
