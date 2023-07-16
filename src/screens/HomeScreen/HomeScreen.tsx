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
import { width } from '../../themes';
import { AppStackParamList } from '../../navigation';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DESTRICT } from '../../constant';

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
          data={DESTRICT}
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
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item, index }) => (
            <LinearGradient
              colors={['#FFD3A5', '#FD6585']}
              style={styles.linearGradient}>
              <TouchableOpacity
                style={styles.cityContainer}
                onPress={() => {
                  navigation.navigate('OfficerListScreen', {
                    cityObj: { name: item },
                  });
                }}>
                <Text style={styles.cityLabel}>{item}</Text>
              </TouchableOpacity>
            </LinearGradient>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityLabel: { fontSize: 15, fontWeight: '600' },
  linearGradient: {
    width: width * 0.43,
    height: width * 0.1,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default HomeScreen;
