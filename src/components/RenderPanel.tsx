import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type RenderPanelProps = { title: string; value: string };

const RenderPanel = ({ title, value }: RenderPanelProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.valueText}>{value}</Text>
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
  valueText: { flex: 1, fontSize: 15, fontWeight: '400', lineHeight: 30 },
});

export default RenderPanel;
