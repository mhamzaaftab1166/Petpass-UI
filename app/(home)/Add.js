import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import StepIndicator from "react-native-step-indicator";
import SafeScreen from "../components/SafeScreen/SafeScreen";
import { Colors } from "../theme/color";
import { customPetStyles, styles } from "../constants/Pets";
import { useTheme } from "../helper/themeProvider";
import doneDisable from "../../assets/images/pets/doneDisable.png";
import doneActive from "../../assets/images/pets/doneActive.png";
import footActive from "../../assets/images/pets/footActive.png";
import footDisable from "../../assets/images/pets/footDisable.png";
import dogActive from "../../assets/images/pets/dogActive.png";
import dogDisable from "../../assets/images/pets/dogDisable.png";

const StepIndicatorExample = () => {
  const { isDarkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
 const stepIcons = [
  { active: footActive, inactive: footDisable },
  { active: dogActive, inactive: dogDisable },
  { active: doneActive, inactive: doneDisable },
];
  return (
    <SafeScreen
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <StepIndicator
        customStyles={customPetStyles}
        currentPosition={currentStep}
        stepCount={3}
        renderStepIndicator={({ position, stepStatus }) => {
          let iconSource;

          if (stepStatus === "finished" || stepStatus === "current") {
            iconSource = stepIcons[position].active;
          } else {
            iconSource = stepIcons[position].inactive;
          }

          return (
            <Image source={iconSource} style={{ width: 30, height: 30 }} />
          );
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.stepText}>Step {currentStep + 1} Content</Text>
      </View>

      <View style={styles.buttonContainer}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={[styles.button, styles.previousButton]}
            onPress={prevStep}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, { marginLeft: currentStep > 0 ? 10 : 0 }]}
          onPress={nextStep}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

export default StepIndicatorExample;
