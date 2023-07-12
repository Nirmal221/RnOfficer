import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../../themes/Colors';
import { TextInputField } from '../../components';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Registration</Text>
      </View>
      <View style={styles.container}>
        <TextInputField
          value={name}
          placeholder={''}
          onChangeText={text => setName(text)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.secondary,
  },
  headerContainer: {
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 5,
  },
  headerTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: Platform.OS === 'ios' ? 0 : 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
});

export default RegistrationScreen;
