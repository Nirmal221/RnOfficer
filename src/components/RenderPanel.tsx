import React from 'react';
import {
  Text,
  View,
  TextStyle,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import ApplicationStyle from '../themes/ApplicationStyle';

type RenderPanelProps = {
  title?: string;
  value?: string;
  panelTitle?: string;
  valueTextStyle?: TextStyle;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
};

const RenderPanel = ({
  title,
  value,
  panelTitle,
  titleStyle,
  valueTextStyle,
  containerStyle,
  onPress,
  disabled,
}: RenderPanelProps) => {
  return (
    <View style={styles.mainContainer}>
      {panelTitle && <Text style={styles.panelTitleText}>{panelTitle}</Text>}
      {value && (
        <TouchableOpacity
          disabled={disabled}
          style={[styles.container, containerStyle]}
          onPress={onPress}>
          {title && <Text style={[styles.titleText, titleStyle]}>{title}</Text>}
          <Text style={[styles.valueText, valueTextStyle]}>{value}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: { width: 100, lineHeight: 30, ...ApplicationStyle.f15w600 },
  valueText: { ...ApplicationStyle.f15w400 },
  panelTitleText: { ...ApplicationStyle.f15w500, lineHeight: 30 },
});

export default RenderPanel;
