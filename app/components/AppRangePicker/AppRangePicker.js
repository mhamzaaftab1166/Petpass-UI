import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RangeSlider from "react-native-range-slider-expo";
import { useTheme } from "../../helper/themeProvider";
import { Colors } from "../../theme/color";

const AppRangePicker = ({
  minValue = 0,
  maxValue = 0,
  label,
  onChange,
  style,
  value,
  parentStyles,
  editable = true,
}) => {
  const { isDarkMode } = useTheme();
  const [fromValue, setFromValue] = useState(value?.from);
  const [toValue, setToValue] = useState(value?.to);

  const handleFromValueChange = (low) => {
    setFromValue(low);
    onChange({ from: low, to: toValue });
  };

  const handleToValueChange = (high) => {
    setToValue(high);
    onChange({ from: fromValue, to: high });
  };
  return (
    <View style={[styles.container, parentStyles]}>
      <Text
        style={[
          style.s16,
          { color: isDarkMode ? Colors.secondary : Colors.lable },
        ]}
      >
        {label}: {`${value?.from || minValue} - ${value?.to || maxValue}`}
      </Text>

      <RangeSlider
        min={minValue}
        max={maxValue}
        fromValue={fromValue}
        toValue={toValue}
        step={1}
        initialFromValue={value?.from}
        initialToValue={value?.to}
        fromValueOnChange={handleFromValueChange}
        toValueOnChange={handleToValueChange}
        disabled={!editable}
        inRangeBarColor={Colors.primary}
        outOfRangeBarColor={Colors.disable}
        rangeLabelsTextColor={Colors.primary}
        toKnobColor={Colors.primary}
        fromKnobColor={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
});

export default AppRangePicker;
