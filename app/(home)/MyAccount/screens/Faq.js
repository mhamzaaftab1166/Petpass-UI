import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  Text,
} from "react-native";
import { Colors } from "../../../theme/color";
import style from "../../../theme/style";
import { useRouter } from "expo-router";
import { useTheme } from "../../../helper/themeProvider";
import { AppBar } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.faqItemContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.faqTitleContainer}>
        <Text style={styles.faqQuestion}>{question}</Text>
        <Icon
          name={expanded ? "chevron-up" : "chevron-down"}
          size={24}
          color={Colors.primary}
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.faqAnswerContainer}>
          <Text style={styles.faqAnswer}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

export default function FAQ() {
  const router = useRouter();
  const { isDarkMode } = useTheme();

  // Sample FAQ data
  const faqData = [
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, go to settings and tap on 'Reset Password'. Follow the instructions provided to update your credentials.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact our support team via email at support@example.com or call our hotline during business hours.",
    },
    {
      question: "Where can I find the user guide?",
      answer:
        "The user guide is available in the Help section of the app or on our website under the 'Resources' tab.",
    },
    {
      question: "How do I update my profile?",
      answer:
        "Navigate to your profile, tap the edit button, update your details, and save the changes.",
    },
    // Add more FAQ items as needed...
  ];

  return (
    <SafeAreaView
      style={[
        style.area,
        { backgroundColor: isDarkMode ? Colors.active : Colors.secondary },
      ]}
    >
      <AppBar
        color={isDarkMode ? Colors.active : Colors.secondary}
        title="FAQ"
        titleStyle={[
          style.b18,
          { color: isDarkMode ? Colors.secondary : Colors.active },
        ]}
        centerTitle={true}
        elevation={0}
        leading={
          <TouchableOpacity onPress={() => router.back()}>
            <Icon
              name="chevron-back"
              color={isDarkMode ? Colors.secondary : Colors.active}
              size={30}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        <Text style={styles.headerSubtitle}>
          Find answers to common questions below.
        </Text>
        {faqData.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.lable,
    marginBottom: 20,
    textAlign: "center",
  },
  faqItemContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: Colors.dark,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  faqTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.light,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
    flex: 1,
  },
  faqAnswerContainer: {
    padding: 16,
    backgroundColor: Colors.secondary,
  },
  faqAnswer: {
    fontSize: 14,
    color: Colors.dark,
    lineHeight: 20,
  },
});
