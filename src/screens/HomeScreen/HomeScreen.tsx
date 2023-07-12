import React, { useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { width } from '../../themes';
import { useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput
          value={search}
          placeholder="Search"
          style={styles.searchTextInput}
          onChangeText={(text: string) => setSearch(text)}
        />
        <FlatList
          data={['Surat', 'Ahemedabad', 'Vadodara', 'Jamnagar']}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={['#9Bd35A', '#689F38']}
              tintColor={'#9Bd35A'}
              onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => {
                  setRefreshing(false);
                }, 1500);
              }}
            />
          }
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.cityContainer}
              onPress={() => {
                navigation.navigate('OfficerListScreen', {
                  cityObj: { name: item },
                });
              }}>
              <Text style={styles.cityLabel}>{item}</Text>
            </TouchableOpacity>
            // <RenderOfficerDetails item={item} index={index} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    marginBottom: width * 0.1,
  },
  cityContainer: {
    width: width * 0.44,
    height: width * 0.1,
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityLabel: { fontSize: 15, fontWeight: '600' },
});

export default HomeScreen;
