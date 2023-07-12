import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type RenderPanelProps = {
  title?: string;
  value?: string;
  panelTitle?: string;
  valueTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onPress?: () => void;
};

const RenderPanel = ({
  title,
  value,
  panelTitle,
  valueTextStyle,
  containerStyle,
  onPress,
}: RenderPanelProps) => {
  return (
    <View>
      {panelTitle && <Text style={styles.panelTitleText}>{panelTitle}</Text>}
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={onPress}>
        {title && <Text style={styles.titleText}>{title}</Text>}
        <Text style={[styles.valueText, valueTextStyle]}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: { flex: 0.53, fontSize: 15, fontWeight: '700', lineHeight: 30 },
  valueText: { flex: 1, fontSize: 15, fontWeight: '400' },
  panelTitleText: { fontSize: 15, fontWeight: '600', lineHeight: 30 },
});

export default RenderPanel;
